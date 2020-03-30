const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const storeScheme = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a store name!"
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String]
});

storeScheme.pre("save", function(next) {
  if (!this.isModified("name")) {
    next(); // skip ti
    return; // stop this func from running
  }
  this.slug = slug(this.name);
  next();

  // TODO make the slugs unique
});

module.exports = mongoose.model("Store", storeScheme);
