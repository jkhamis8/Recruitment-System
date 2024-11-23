const isSignIn = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect("/sign-in")
}

module.exports = isSignIn;
