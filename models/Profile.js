const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  group: {
    type: String
  },
  role: {
    type: String
  },
  access: {
    type: String
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
