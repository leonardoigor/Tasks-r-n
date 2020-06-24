const mongoose = require('mongoose');

module.exports = () => {
  const Tasks = new mongoose.Schema({
    doneAt: {type: String, default: null},
    desc: String,
    estimateAt: String,
    userId: Number,
  });

  return mongoose.model('Tasks', Tasks);
};
