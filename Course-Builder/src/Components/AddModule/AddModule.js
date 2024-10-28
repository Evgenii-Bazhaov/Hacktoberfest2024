import React, { useState } from 'react';
import { FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { TfiUpload } from 'react-icons/tfi';
import { IoIosLink } from 'react-icons/io';
import { LiaDatabaseSolid } from "react-icons/lia";
import Modal from './Modal';

const AddModule = ({ onAddModule, onAddResource, onAddLink }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkName, setLinkName] = useState('');

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
    setShowDropdown(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setModuleName('');
    setLinkUrl('');
    setLinkName('');
  };

  const handleCreateModule = () => {
    onAddModule(moduleName);
    closeModal();
  };

  const handleAddLink = () => {
    if (onAddLink) {
      onAddLink({ url: linkUrl, name: linkName });
    }
    closeModal();
  };

  return (
    <div className="relative">
      <button
        className="bg-red-600 text-white py-2 px-4 rounded inline-flex items-center"
        onClick={toggleDropdown}
      >
        <FaPlus className="mr-3" />
        Add
        {showDropdown ? (
          <FaChevronUp className="ml-3" />
        ) : (
          <FaChevronDown className="ml-3" />
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-[18rem] bg-white shadow-lg rounded-md z-10">
          <button
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={() => openModal('module')}
          >
            <LiaDatabaseSolid className="mr-3" />
            Create module
          </button>
          <button
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={() => openModal('link')}
          >
            <IoIosLink className="mr-3" />
            Add a link
          </button>
          <button
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={() => document.getElementById('file-input').click()}
          >
            <TfiUpload className="mr-3" />
            Upload
          </button>
          <input
            id="file-input"
            type="file"
            multiple
            className="hidden"
            onChange={(e) => onAddResource(e.target.files)}
          />
        </div>
      )}

      {showModal && modalType === 'module' && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-bold mb-10">Create new module</h2>
          <h2 className="text-l font-semibold mb-2">Module name</h2>
          <input
            type="text"
            placeholder="Module name"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            className="border p-2 w-full mb-4 rounded"
          />
          <div className="flex justify-end">
            <button
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="bg-green-600 text-white py-2 px-4 rounded"
              onClick={handleCreateModule}
            >
              Create
            </button>
          </div>
        </Modal>
      )}

      {showModal && modalType === 'link' && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-semibold mb-4">Add New Link</h2>
          <label className="text-sm font-semibold mb-2 block">URL</label>
          <input
            type="text"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <label className="text-sm font-semibold mb-2 block">Display Name</label>
          <input
            type="text"
            placeholder="Example Link"
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <div className="flex justify-end">
            <button
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="bg-green-600 text-white py-2 px-4 rounded"
              onClick={handleAddLink}
            >
              Add
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddModule;
