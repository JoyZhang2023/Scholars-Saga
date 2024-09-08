// This is set up to employ the use of bcrypt for hashing purposes
// when we have the application at a later stage, namely when
// user creation via admin functionality is present.
// At least, that's my intention for now...

const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10; // Adjust as needed
  return await bcrypt.hash(password, saltRounds);
};

module.exports = { hashPassword };