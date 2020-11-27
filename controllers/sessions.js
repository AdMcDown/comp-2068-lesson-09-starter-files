const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  passport.authenticate('local', (error, user) => {
    if (error || !user) return next(error);

    req.login(user, { session: false }, async err => {
      if (err) return next(err);

      const body = { _id: user._id, email: user.email };
      const token = jwt.sign({ user: body }, 'any salty secret here');

      return res.status(200).json({ token });
    });
  })(req, res, next);
};