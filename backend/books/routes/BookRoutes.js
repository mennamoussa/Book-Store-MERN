const express = require("express");
const router = express.Router();
const {createBook, getBooks, getBookByID, updateBook, deleteBook} = require("../controllers/BookController");

//---------------------------------------------------------------------------------------------------------------------

//get all books
router.route("/").get(getBooks);

//get a book by id
router.route("/:id").get(getBookByID);

//create a book
router.route("/").post(createBook);

//update a book by id
router.route("/:id").put(updateBook);

//delete a book by id
router.route("/:id").delete(deleteBook);

module.exports = router;