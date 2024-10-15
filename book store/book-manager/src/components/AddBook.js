import React, { useState } from 'react';
import axios from 'axios';
import './AddBook.css'; // Import the enhanced CSS

const AddBook = () => {
  const [formData, setFormData] = useState({ title: '', category: '', price: '', date: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const uploadBook = async () => {
    const { title, category, price, date } = formData;

    if (!title || !category || !price || !date) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/upload-book', formData);
      alert('Book added successfully!');
      setFormData({ title: '', category: '', price: '', date: '' });
      setErrorMessage(''); // Clear the error message
    } catch (error) {
      console.error('Error uploading book:', error);
      setErrorMessage('Failed to add the book. Please try again.');
    }
  };

  return (
    <div className="add-book-container">
      <div className="add-book-content">
        <h2 className="add-book-title">Add New Book</h2>
        <input
          className="add-book-input"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          className="add-book-input"
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
        <input
          className="add-book-input"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          className="add-book-input"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="cta-button" onClick={uploadBook}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default AddBook;
