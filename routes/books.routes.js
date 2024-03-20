const express = require('express');
const bookRouter = express.Router();
const Book = require('../model/book.model');
const auth = require('../middleware/auth.middleware');

// GET all books
bookRouter.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific book by ID
bookRouter.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new book
bookRouter.post('/',async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    price: req.body.price,
    quantity: req.body.quantity
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT/PATCH update a book
bookRouter.patch('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      if (req.body.title != null) {
        book.title = req.body.title;
      }
      if (req.body.author != null) {
        book.author = req.body.author;
      }
      if (req.body.category != null) {
        book.category = req.body.category;
      }
      if (req.body.price != null) {
        book.price = req.body.price;
      }
      if (req.body.quantity != null) {
        book.quantity = req.body.quantity;
      }
      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a book
bookRouter.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      await book.remove();
      res.json({ message: 'Book deleted' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = 
{
    bookRouter
}
