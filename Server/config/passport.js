const {authSecret} = require('../.env');

const passport = require('passport');
const passportJwt = require('passport-jwt');
const {Strategy, ExtractJwt} = passportJwt;

module.exports = app => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  const startegy = new Strategy(params, (payload, done) => {
    app.User.find({id: payload.id})
      .then(user => {
        if (user) {
          done(null, {id: user.id, email: user.email});
        } else {
          done(null, false);
        }
      })
      .catch(e => done(e.false));
  });
  passport.use(startegy);

  return {
    initialise: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', {session: false}),
  };
};
