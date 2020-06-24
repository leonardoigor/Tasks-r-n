/* eslint-disable handle-callback-err */
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
  const getHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => callback(hash));
    });
  };

  const save = async (req, res) => {
    getHash(req.body.password, async hash => {
      const pass = hash;
      const newUser = await app;

      app
        .User({
          name: req.body.name,
          email: req.body.email.toLowerCase(),
          password: hash,
        })
        .save((err, doc) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(200).json(doc);
          }
        });
    });
  };

  return {save};
};
