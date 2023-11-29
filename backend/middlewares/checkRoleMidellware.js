const asyncHandler = require('express-async-handler');


const checkUserRole = asyncHandler (async (req, res, next) => {
    const user = req.user; // Assuming you have a user object attached to the request
  
    if (user && (user.role === 'admin' || user.role === 'manager')) {
      // If the user is an admin or manager, allow them to proceed
      next();
    } else {
      // If the user is not authorized, send an error response
      return res.status(403).json({ message: "Unauthorized access" });
    }
  });

  module.exports = { checkUserRole } ;