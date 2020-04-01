const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.homePage = (req, res, next) => {
  res.render("index");
};

exports.addStore = (req, res, next) => {
  res.render("editStore", {
    title: "Add Store"
  });
};

exports.saveStore = async (req, res, next) => {
  const store = new Store(req.body);

  await store.save();
  res.redirect("/");
};
