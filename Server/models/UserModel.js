const mongoose = require('mongoose');

module.exports = () => {
  const User = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });

  return mongoose.model('User', User);
};
