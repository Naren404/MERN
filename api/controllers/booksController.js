import Book from "../models/bookModel.js"

// INDEX
const getBooks = async(req, res) => {
  const books = await Book.find()

  if(books){
    return res.json({
      books
    })
  }else{
    return res.status(400).send({error: "Cannot find books"})
  }
}

const createBook = async(req, res) => {
  const {title, author} = req.body

  const book = await Book.create({ title, author })

  if(book){
    return res.json({
      title: book.title,
      author: book.author
    })
  }
  else{
    return res.status(400).send({error: "Cannot create book"})
  }
}

export { getBooks, createBook }