import React, { useContext } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { dataContext } from '../../../Providers/DataProvider';
import { MdDragIndicator, MdDriveFileRenameOutline } from 'react-icons/md';
import { getIconForFileType } from '../../utils';
import { FaEllipsisV } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TfiDownload } from 'react-icons/tfi';
import { IoIosLink } from 'react-icons/io';

const ResourceContainer = () => {
    const {resources, setCurrentResource, setShowResourceDropdown, showResourceDropdown, currentResource, handleResourceDropdownAction} = useContext(dataContext);

    return (
        <Droppable droppableId="resources" type="RESOURCE">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-full max-w-4xl mt-8 flex flex-col space-y-4"
                >
                    {resources.map((resource, index) => (
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
                                    className="flex items-center justify-between p-2 border rounded bg-gray-100 shadow-sm relative"
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
                                                        handleResourceDropdownAction("rename")
                                                    }
                                                >
                                                    <MdDriveFileRenameOutline className="mr-2 mt-1" />
                                                    Rename
                                                </button>
                                                {resource.url ? (
                                                    <button
                                                        className="flex w-full px-4 py-2 text-left hover:bg-gray-100"
                                                        onClick={() =>
                                                            handleResourceDropdownAction("openLink")
                                                        }
                                                    >
                                                        <IoIosLink className="mr-2 mt-1" />
                                                        Open Link
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="flex w-full px-4 py-2 text-left hover:bg-gray-100"
                                                        onClick={() =>
                                                            handleResourceDropdownAction("download")
                                                        }
                                                    >
                                                        <TfiDownload className="mr-2 mt-1" />
                                                        Download
                                                    </button>
                                                )}
                                                <hr/>
                                                <button
                                                    className="flex w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500"
                                                    onClick={() =>
                                                        handleResourceDropdownAction("delete")
                                                    }
                                                >
                                                    <RiDeleteBinLine className="mr-2 mt-1 " />
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
    )
}

export default ResourceContainer