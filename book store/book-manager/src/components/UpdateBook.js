import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateBook = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', category: '' });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/book/${id}`);
        setFormData({ title: response.data.title, category: response.data.category });
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
    fetchBook();
  }, [id]);

  const updateBook = async () => {
    try {
      await axios.patch(`http://localhost:5000/book/${id}`, formData);
      alert('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="container">
      <h2>Update Book</h2>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      />
      <button onClick={updateBook}>Update</button>
    </div>
  );
};

export default UpdateBook;
