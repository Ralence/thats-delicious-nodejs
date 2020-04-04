const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.homePage = (req, res, next) => {
  res.render("index");
};

exports.addStore = (req, res, next) => {
  res.render("editStore", {
    title: "Add Store",
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

exports.editStore = async (req, res) => {
  // 1 find the store given the ID
  const store = await Store.findOne({ _id: req.params.id });
  // 2 confirm the are the owner of the store
  // TODO
  // 3 render out the edit form so user can edit their store

  res.render("editStore", {
    title: `Edit ${store.name}`,
    store,
  });
};

exports.updateStore = async (req, res) => {
  // 1 find and update the store
  const store = await Store.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead ot the old one
    runValidators: true,
  }).exec();
  req.flash(
    "success",
    `Successfully updated <strong>${store.name}</strong> <a href="/stores/${store.slug}">View Store</a>`
  );
  res.redirect(`/stores/${store.id}/edit`);
  // 2 redirect and tell the user it worked
};
