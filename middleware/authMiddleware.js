module.exports.isAdminAuthenticated = (req, res, next) => {
    if (!req.session.isAdminAuthenticated) {
      return res.redirect('/admin/login');
    }
    next();
  };
  