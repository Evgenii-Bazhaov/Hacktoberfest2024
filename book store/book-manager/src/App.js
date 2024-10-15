import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaPlus, FaList } from 'react-icons/fa'; // Import icons
import Home from './components/Home';
import AddBook from './components/AddBook';
import BookList from './components/BookList';
import UpdateBook from './components/UpdateBook';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/"><FaHome /> Home</Link>
          <Link to="/add-book"><FaPlus /> Add Book</Link>
          <Link to="/book-list"><FaList /> Book List</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/book-list" element={<BookList />} />
          <Route path="/update-book/:id" element={<UpdateBook />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
