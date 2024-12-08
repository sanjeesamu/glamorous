"use strict";

module.exports.isAdminAuthenticated = function (req, res, next) {
  if (!req.session.isAdminAuthenticated) {
    return res.redirect('/admin/login');
  }

  next();
};