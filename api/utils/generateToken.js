import jwt from 'jsonwebtoken'

// Generating the token:
// The generateToken function takes two parameters: res (the response object) and userId (the user ID for whom the token will be generated).
// Inside the function, the jwt.sign() method is called to create a new JWT. It takes three arguments:

// The payload: { userId }, an object containing the user ID.
// The secret: process.env.JWT_SECRET, which should be a secure secret key stored in an environment variable.
// Options: { expiresIn: '30d' }, specifying that the token will expire in 30 days.

// Setting the cookie:
// The function then sets the generated token as a cookie in the response using res.cookie(). The cookie is named 'jwt' and has the following options:

// httpOnly: true restricts access to the cookie only through HTTP/S requests, preventing client-side JavaScript from accessing it.
// secure: process.env.NODE_ENV !== 'development' determines whether the cookie should be secure or not. In production (NODE_ENV !== 'development'), the cookie will be set as secure, meaning it will only be sent over HTTPS.
// sameSite: 'strict' specifies that the cookie should only be sent for requests originating from the same site, providing protection against Cross-Site Request Forgery (CSRF) attacks.
// maxAge: 30 * 24 * 60 * 60 * 1000 sets the maximum age of the cookie to 30 days (in milliseconds).

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken