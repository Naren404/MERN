import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "student" }
  },
  {
    timestamps: true
  }
)

// encrypting the password
userSchema.pre('save', async function (next){
  if(!this.isModified('password')){
    next()
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword

    next()
  } catch (error) {
    return next(error)
  }
})

userSchema.methods.matchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User