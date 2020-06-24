const mongoose = require('mongoose');
module.exports = () => {
  const uri =
    'mongodb+srv://igor:76849912@cluster0.6c9v0.mongodb.net/tasks?retryWrites=true&w=majority';

  mongoose.connect(`${uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
    console.log('Db connect');
  });

  return mongoose;
};
