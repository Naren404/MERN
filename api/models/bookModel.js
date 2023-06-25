import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    available: {type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

const Book = mongoose.model('Book', bookSchema)

export default Book