const {authSecret} = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
  const signin = async (r, s) => {
    const {email, password} = r.body;
    if (!email || !password) {
      return s.status(400).send('Dados Incompleto');
    }
    const user = await app.User.find({email});
    let newUser = {};
    if (user[0]) {
      bcrypt.compare(password, user[0].password, (e, isMatch) => {
        if (e || !isMatch) {
          return s.status(401).send(' A senha informada é inválida');
        }
        const payload = {id: user.id};
        newUser = {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          password: user[0].password,
          token: jwt.encode(payload, authSecret),
        };
        s.json(newUser);
      });
    } else {
      s.status(400).send('Usuario nao cadastrado');
    }
  };
  return {signin};
};
