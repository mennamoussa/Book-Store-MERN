import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllBooks.css';
import Navbar from '../../components/Navbar/Navbar';

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5002/books'); // Update port if needed
        setBooks(res.data);
      } catch (err) {
        console.error('Failed to fetch books:', err.message);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
    <Navbar />
    <div className="home-container">
      {/* <h1 className="home-heading">📚 Library Book Catalog</h1> */}
      <div className="book-grid">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <img
              src={book.coverImage || 'https://via.placeholder.com/150'}
              alt={book.title}
              className="book-image"
            />
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <p className="book-stock">
                {book.inStock > 0 ? `Available (${book.inStock})` : 'Out of stock'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div></>
    
  );
};

export default AllBooks;
