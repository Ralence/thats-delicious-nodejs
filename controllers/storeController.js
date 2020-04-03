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
  const store = await new Store(req.body).save();

  await store.save();
  req.flash("success", `Successfully created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  // 1 query the db for all stores
  const stores = await Store.find();

  res.render("stores", { title: "Stores", stores });
};
