import React, { createContext, useEffect, useState } from 'react'
import PrimaryModal from '../../Components/Modals/PrimaryModal';

export const dataContext = createContext();

const DataProvider = ({ children }) => {
    const [modules, setModules] = useState(() => {
        const savedModules = localStorage.getItem("modules");
        return savedModules ? JSON.parse(savedModules) : [];
    });

    const [resources, setResources] = useState(() => {
        const savedResources = localStorage.getItem("resources");
        return savedResources ? JSON.parse(savedResources) : [];
    });

    const [showEditModal, setShowEditModal] = useState(false);
    const [showResourceDropdown, setShowResourceDropdown] = useState(false);
    const [showModuleDropdown, setShowModuleDropdown] = useState(false);
    const [currentModule, setCurrentModule] = useState(null);
    const [currentResource, setCurrentResource] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [newResourceName, setNewResourceName] = useState("");
    

    const addModule = (title) => {
        const newModule = { id: Date.now().toString(), title, resources: [] };
        setModules((prevModules) => [...prevModules, newModule]);
    };

    const deleteModule = (id) => {
        setModules((prevModules) =>
            prevModules.filter((module) => module.id !== id)
        );
    };

    const renameModule = (id, newTitle) => {
        setModules((prevModules) =>
            prevModules.map((module) =>
                module.id === id ? { ...module, title: newTitle } : module
            )
        );
    };


    const handleAddResource = (files) => {
        const newResources = Array.from(files).map((file) => ({
            id: Date.now().toString() + Math.random().toString(),
            file,
            name: file.name,
        }));
        setResources((prevResources) => [...prevResources, ...newResources]);
    };

    const handleRenameResource = (id, newName, newUrl) => {
        setResources((prevResources) =>
            prevResources.map((resource) =>
                resource.id === id
                    ? { ...resource, name: newName, url: newUrl }
                    : resource
            )
        );

        setModules((prevModules) =>
            prevModules.map((module) => ({
                ...module,
                resources: module.resources.map((resource) =>
                    resource.id === id
                        ? { ...resource, name: newName, url: newUrl }
                        : resource
                ),
            }))
        );
    };

    const handleDeleteResource = (id) => {
        setResources((prevResources) =>
            prevResources.filter((resource) => resource.id !== id)
        );

        setModules((prevModules) =>
            prevModules.map((module) => ({
                ...module,
                resources: module.resources.filter((resource) => resource.id !== id),
            }))
        );
    };

    const handleAddLink = (link) => {
        const newLink = {
            id: Date.now().toString() + Math.random().toString(),
            url: link.url,
            name: link.name,
        };
        setResources((prevResources) => [...prevResources, newLink]);
    };

    const openEditModal = (module) => {
        setCurrentModule(module);
        setNewTitle(module.title);
        setShowEditModal(true);
        setShowModuleDropdown(false);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setCurrentModule(null);
        setCurrentResource(null);
        setNewTitle("");
    };

    const handleSaveChanges = () => {
        if (currentModule) {
            renameModule(currentModule.id, newTitle);
            closeEditModal();
        } else if (currentResource) {
            handleRenameResource(
                currentResource.id,
                newResourceName,
                currentResource.url
            );
            setNewResourceName("");
            setShowEditModal(false);
            setCurrentResource(null);
        }
    };

    const handleDropdownAction = (action) => {
        if (action === "edit") {
            openEditModal(currentModule);
        } else if (action === "delete") {
            deleteModule(currentModule.id);
            setShowModuleDropdown(false);
        }
    };

    const handleResourceDropdownAction = (action) => {
        if (action === "rename") {
            setNewResourceName(currentResource.name);
            setShowEditModal(true);
        } else if (action === "download") {
            if (currentResource.file) {
                const url = URL.createObjectURL(currentResource.file);
                const a = document.createElement("a");
                a.href = url;
                a.download = currentResource.name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        } else if (action === "openLink") {
            if (currentResource.url) {
                window.open(currentResource.url, "_blank", "noopener,noreferrer");
            }
        } else if (action === "delete") {
            handleDeleteResource(currentResource.id);
            setShowResourceDropdown(false);
        }
    };

    const onDragEnd = (result) => {
        const { source, destination, draggableId, type } = result;

        if (!destination) return;

        if (type === "MODULE") {
            const newModules = Array.from(modules);
            const [removed] = newModules.splice(source.index, 1);
            newModules.splice(destination.index, 0, removed);
            setModules(newModules);
            return;
        }

        if (type === "RESOURCE") {
            const sourceModuleIndex = modules.findIndex(
                (module) => module.id === source.droppableId
            );
            const destinationModuleIndex = modules.findIndex(
                (module) => module.id === destination.droppableId
            );

            if (source.droppableId === "resources" && destinationModuleIndex !== -1) {
                const [movedResource] = resources.splice(source.index, 1);
                const newModules = [...modules];
                newModules[destinationModuleIndex].resources.splice(
                    destination.index,
                    0,
                    movedResource
                );

                setResources([...resources]);
                setModules(newModules);
            } else if (
                destination.droppableId === "resources" &&
                sourceModuleIndex !== -1
            ) {
                const sourceModule = { ...modules[sourceModuleIndex] };
                const [movedResource] = sourceModule.resources.splice(source.index, 1);
                const newResources = [...resources];
                newResources.splice(destination.index, 0, movedResource);

                const newModules = [...modules];
                newModules[sourceModuleIndex] = sourceModule;

                setModules(newModules);
                setResources(newResources);
            } else if (
                sourceModuleIndex === destinationModuleIndex &&
                sourceModuleIndex !== -1
            ) {
                const moduleToUpdate = { ...modules[sourceModuleIndex] };
                const [removed] = moduleToUpdate.resources.splice(source.index, 1);
                moduleToUpdate.resources.splice(destination.index, 0, removed);

                const newModules = [...modules];
                newModules[sourceModuleIndex] = moduleToUpdate;

                setModules(newModules);
            } else if (sourceModuleIndex !== -1 && destinationModuleIndex !== -1) {
                const sourceModule = { ...modules[sourceModuleIndex] };
                const destinationModule = { ...modules[destinationModuleIndex] };
                const [movedResource] = sourceModule.resources.splice(source.index, 1);
                destinationModule.resources.splice(destination.index, 0, movedResource);

                const newModules = [...modules];
                newModules[sourceModuleIndex] = sourceModule;
                newModules[destinationModuleIndex] = destinationModule;

                setModules(newModules);
            }
        }
    };

    useEffect(() => {
        console.log(showModuleDropdown)
    }, [showModuleDropdown])

    useEffect(() => {
        console.log(currentModule)
    }, [currentModule])

    useEffect(() => {
        console.log(modules);
        localStorage.setItem("modules", JSON.stringify(modules));
        localStorage.setItem("resources", JSON.stringify(resources));
    }, [modules, resources]);

    const value = {
        modules,
        resources,
        showEditModal,
        showModuleDropdown,
        showResourceDropdown,
        currentModule,
        currentResource,
        setModules,
        setResources,
        setCurrentModule, 
        setShowModuleDropdown,
        setCurrentResource, 
        setShowResourceDropdown,
        handleResourceDropdownAction,
        handleDropdownAction,
        addModule,
        handleAddLink,
        handleAddResource,
        onDragEnd
    }

    return (
        <dataContext.Provider value={value}>
            {children}
            <PrimaryModal 
                visible={showEditModal} 
                onClose={closeEditModal} 
                currentModule={currentModule} 
                currentResource={currentResource}
                newTitle={newTitle}
                setNewTitle={setNewTitle}
                setNewResourceName={setNewResourceName}
                setShowEditModal={setShowEditModal}
                setCurrentResource={setCurrentResource}
                newResourceName={newResourceName}
                handleSaveChanges={handleSaveChanges} 
            />
        </dataContext.Provider>
    )
}

export default DataProvider