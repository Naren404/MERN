import Book from "../models/bookModel.js"

// INDEX
const getBooks = async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// SHOW
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    console.log('book', book)
    res.json(book)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// CREATE
const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body)
    await newBook.save()

    res.json(newBook)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if(!updatedBook){
      res.status(400).json({ error: 'Item not found' })
    }

    res.json(updatedBook)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deletebook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id)

    if(!deletedBook){
      res.status(400).json({ error: 'Item not found' })
    }

    res.json({ message: 'Book deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { getBook, getBooks, createBook, updateBook, deletebook }