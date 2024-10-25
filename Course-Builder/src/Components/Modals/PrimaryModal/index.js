import React from 'react'
import Modal from '../../AddModule/Modal';

const PrimaryModal = ({visible, onClose, currentModule, newTitle, setNewTitle, setNewResourceName, setShowEditModal, setCurrentResource, newResourceName, handleSaveChanges}) => {
    return (
        visible
        ?
        <Modal onClose={onClose}>
            <div className="relative p-4">
                <h2 className="text-xl font-bold mb-8">
                    {currentModule ? "Edit module" : "Rename file"}
                </h2>
                <h3 className="text-l font-semibold mb-2">
                    {currentModule ? "Module name" : "File name"}
                </h3>
                <input
                    type="text"
                    value={currentModule ? newTitle : newResourceName}
                    onChange={(e) => {
                        if (currentModule) setNewTitle(e.target.value);
                        else setNewResourceName(e.target.value);
                    }}
                    className="border p-2 w-full mb-4 rounded"
                />

                <div className="flex flex-row-reverse">
                    <button
                        onClick={handleSaveChanges}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Save changes
                    </button>
                    <button
                        onClick={() => {
                            setShowEditModal(false);
                            setCurrentResource(null);
                        }}
                        className="bg-gray-200 text-gray px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
        : 
        null
    )
}

export default PrimaryModal

