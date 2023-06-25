import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// The protect function takes three parameters: req (the request object), res (the response object), 
// and next (the callback function to proceed to the next middleware or route handler).
const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  // The code verifies the token's authenticity and decodes its payload using jwt.verify().
  // It uses the process.env.JWT_SECRET value as the secret key for verification.
  // If the token is valid, the middleware retrieves the corresponding user by calling User.findById(decoded.userId)
  // based on the decoded user ID. 
  // The password field is excluded from the retrieved user object using .select('-password').
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

export { protect };