import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css'; // Import the CSS file

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [sortOption, setSortOption] = useState(''); // State to track selected sort option

  // Fetch all books from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/all-books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  // Delete a book from the backend
  const deleteBook = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/book/${id}`);
        setBooks(books.filter((book) => book._id !== id));
        alert('Book deleted successfully!');
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  // Handle sorting of books based on selected criteria
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);

    let sortedBooks = [...books];
    switch (value) {
      case 'date-asc':
        sortedBooks = sortedBooks.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        sortedBooks = sortedBooks.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'title-asc':
        sortedBooks = sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        sortedBooks = sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'category-asc':
        sortedBooks = sortedBooks.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'category-desc':
        sortedBooks = sortedBooks.sort((a, b) => b.category.localeCompare(a.category));
        break;
      default:
        break;
    }

    setBooks(sortedBooks);
  };

  return (
    <div className="book-list-container">
      <h2 className="book-list-title">All Books</h2>

      {/* Sorting Dropdown */}
      <div className="sort-container">
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="">Select an option</option>
          <option value="date-asc">Date (Oldest First)</option>
          <option value="date-desc">Date (Newest First)</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="category-asc">Category (A-Z)</option>
          <option value="category-desc">Category (Z-A)</option>
        </select>
      </div>

      <ul className="book-list">
        {books.map((book) => (
          <li key={book._id} className="book-list-item">
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>Category: {book.category}</p>
              <p>Date: {new Date(book.date).toLocaleDateString()}</p> {/* Format Date */}
            </div>
            <div className="book-actions">
              <Link to={`/update-book/${book._id}`}>
                <button className="edit">Edit</button>
              </Link>
              <button className="delete" onClick={() => deleteBook(book._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
