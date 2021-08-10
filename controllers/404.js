exports.errorPage = (req, res, next) => {
  res.status(404).render("404", {
    docTitle: "Page Not Found",
    path: "/404",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render("500", {
    docTitle: "Error Occured",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
};
