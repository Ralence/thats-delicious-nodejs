exports.homePage = (req, res, next) => {
  res.render("index");
};

exports.addStore = (req, res, next) => {
  res.render("editStore", {
    title: "Add Store"
  });
};

exports.saveStore = (req, res, next) => {
  res.json(req.body);
};
