import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

// signup
const registerUser = async(req, res) => {

  const { name, email, password } = req.body

  const userExists = await User.findOne({email})

  if(userExists){
    return res.status(400).send({ error: 'User already exists' })
  }

  const user = await User.create({ name, email, password })

  if(user){
    generateToken(res, user._id);

    return res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  }else{
    return res.status(400).send({ error: 'User cannot be created' })
  }
}

// login
const authUser = async(req, res) => {
  const { email, password } = req.body
  console.log('user',req);

  const user = await User.findOne({ email })

  if(user && (await user.matchPassword(password))){
    generateToken(res, user._id)

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  }else{
    res.status(401).send({ error: 'Invalid email or password' })
  }
}

// login
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
}

export { authUser, logoutUser, registerUser }