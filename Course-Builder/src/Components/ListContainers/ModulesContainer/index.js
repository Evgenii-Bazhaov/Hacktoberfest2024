import React, { useContext } from 'react'
import { dataContext } from '../../../Providers/DataProvider';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { MdDragIndicator, MdDriveFileRenameOutline, MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { FaEllipsisV } from 'react-icons/fa';
import { getIconForFileType } from '../../utils';
import { IoIosLink } from 'react-icons/io';
import { TfiDownload } from 'react-icons/tfi';
import { RiDeleteBinLine } from 'react-icons/ri';

const ModulesContainer = () => {
    const {modules, setCurrentModule, setShowModuleDropdown, showModuleDropdown, currentModule, setCurrentResource, showResourceDropdown, currentResource, handleDropdownAction, setShowResourceDropdown, handleResourceDropdownAction} = useContext(dataContext);

    return (
        <Droppable droppableId="modules" type="MODULE">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-full max-w-4xl flex flex-col space-y-4"
                >
                    {modules.map((module, index) => (
                        <Draggable
                            key={module.id}
                            draggableId={module.id}
                            index={index}
                        >
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-4 border rounded bg-white shadow relative"
                                >
                                    <div className="flex justify-between items-center">
                                        <MdDragIndicator className="mr-2 text-gray-500" />
                                        <MdOutlineArrowDropDownCircle className="mr-2 text-gray-500" />
                                        <div className="flex-1">
                                            <h2 className="text-xl font-bold">
                                                {module.title}
                                            </h2>
                                        </div>
                                        <div className="relative">
                                            <button
                                                onClick={() => {
                                                    setCurrentModule(module);
                                                    setShowModuleDropdown(!showModuleDropdown);
                                                }}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <FaEllipsisV />
                                            </button>
                                            {showModuleDropdown &&
                                                currentModule.id === module.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                                                        <button
                                                            onClick={() =>
                                                                handleDropdownAction("edit")
                                                            }
                                                            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                                        >
                                                            Edit Module
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDropdownAction("delete")
                                                            }
                                                            className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                                                        >
                                                            Delete Module
                                                        </button>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <Droppable droppableId={module.id} type="RESOURCE">
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className="mt-4"
                                            >
                                                {module.resources.map((resource, index) => (
                                                    <Draggable
                                                        key={resource.id}
                                                        draggableId={resource.id}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="flex items-center justify-between p-2 border rounded bg-gray-100 shadow-sm relative mb-3"
                                                            >
                                                                <MdDragIndicator className="mr-2 text-gray-500" />
                                                                {getIconForFileType(resource.name)}
                                                                <div className="flex-1">
                                                                    <span>{resource.name}</span>
                                                                </div>
                                                                <button
                                                                    className="text-gray-500 hover:text-gray-700"
                                                                    onClick={() => {
                                                                        setCurrentResource(resource);
                                                                        setShowResourceDropdown(
                                                                            !showResourceDropdown
                                                                        );
                                                                    }}
                                                                >
                                                                    <FaEllipsisV />
                                                                </button>
                                                                {showResourceDropdown &&
                                                                    currentResource === resource && (
                                                                        <div className="absolute right-0  w-48 bg-white border border-gray-300 shadow-lg rounded z-10 mt-[17%]">
                                                                            <button
                                                                                className="flex w-full px-4 py-2 text-left hover:bg-gray-100"
                                                                                onClick={() =>
                                                                                    handleResourceDropdownAction(
                                                                                        "rename"
                                                                                    )
                                                                                }
                                                                            >
                                                                                <MdDriveFileRenameOutline className="mr-2 mt-1" />
                                                                                Rename
                                                                            </button>
                                                                            {resource.url ? (
                                                                                <button
                                                                                    className="flex w-full px-4 py-2 text-left hover:bg-gray-100"
                                                                                    onClick={() =>
                                                                                        handleResourceDropdownAction(
                                                                                            "openLink"
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <IoIosLink className="mr-2 mt-1" />
                                                                                    Open Link
                                                                                </button>
                                                                            ) : (
                                                                                <button
                                                                                    className="flex w-full px-4 py-2 text-left hover:bg-gray-100"
                                                                                    onClick={() =>
                                                                                        handleResourceDropdownAction(
                                                                                            "download"
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <TfiDownload className="mr-2 mt-1" />
                                                                                    Download
                                                                                </button>
                                                                            )}
                                                                            <button
                                                                                className="flex w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500"
                                                                                onClick={() =>
                                                                                    handleResourceDropdownAction(
                                                                                        "delete"
                                                                                    )
                                                                                }
                                                                            >
                                                                                <RiDeleteBinLine className="mr-2 mt-1" />
                                                                                Delete
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default ModulesContainer