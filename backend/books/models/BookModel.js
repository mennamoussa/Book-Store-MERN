const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
    },
    language: {
      type: String,
      required: true,
      default: 'English',
    },
    rating: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Number,
      required: true,
      default: 1,
    },
    coverImage: {
      type: String,
      default: '', // can be a placeholder or uploaded image URL
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', bookSchema);
