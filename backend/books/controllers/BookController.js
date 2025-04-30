const asyncHandler = require('express-async-handler');
const BookModel = require('../models/BookModel');

//create book
//route POST / books
const createBook = asyncHandler(async (req, res) => {
    const{
        title,
        author,
        category,
        isbn,
        language,
        rating,
        inStock,
        coverImage,
     } = req.body;
     if(!title || !author || !inStock) {
        res.status(400);
        throw new Error('ERROR: fill all necessary fields');
     }

     const book = new BookModel({
        title,
        author,
        category,
        isbn,
        language,
        rating,
        inStock,
        coverImage,
     });

     await book.save();
     res.status(201).json({message: 'Book Created', body:book});
});


//update book
//route PUT / books/:id
const updateBook = asyncHandler(async (req,res) => {
    const bookId = req.params.id;
    const {
        title,
        author,
        category,
        isbn,
        language,
        rating,
        inStock,
        coverImage,
    } = req.body;
    try {
        let book = await BookModel.findById(bookId);
        if(!book) {
            return res.status(404).json({message: "ERROR: book not found"});
        }

        if(title) book.title = title;
        if(author) book.author = author;
        if(category) book.category = category;
        if(isbn) book.isbn = isbn;
        if(language) book.language = language;
        if(rating) book.rating = rating;
        if(inStock) book.inStock = inStock;
        if(coverImage) book.coverImage = coverImage;

        await book.save();
        res.status(200).json(book);
    }
    catch(error) {
        console.error("Error updating user: ", error);
        res.status(500).json ({message: "Internal Server Error! "});
    }
});

//get all books
//route GET / books/
const getBooks = asyncHandler(async (req, res) => {
  const books = await BookModel.find({});
  res.status(200).json(books);
  console.log('All Books');
  // console.log(res.json(users));
});

//get a book
//route GET / books/:id
const getBookByID = asyncHandler(async (req, res) => {
  const book = await BookModel.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error('ERROR: Book not found');
  }
  res.status(200).json(book ? book : { message: 'Book not found' });
});

//delete a book
//route DELETE / books/:id
const deleteBook = asyncHandler(async (req, res) => {
  const book = await BookModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Delete Book for ${book.title}` });
});

module.exports = {
    createBook,
    getBooks,
    getBookByID,
    updateBook,
    deleteBook,
  };