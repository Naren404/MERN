const authorizeRole = (roles) => async function (req, res, next) {
  // Check if the user's role is included in the allowed roles
  if (roles.includes(req.user.role)) {
    next(); // User has the required role, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ error: 'Unauthorized' }); // User does not have the required role
  }
}

export { authorizeRole }