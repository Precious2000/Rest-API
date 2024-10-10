const mongoose = require("mongoose");

const { Schema } = mongoose;

const playerSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  other_name: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: true,
    validate: (v) => v > 18 && v < 60,
  },
  role: {
    // To define if user is instructor or student
    type: String,
    default: "player",
  },
  password: {
    type: String,
    required: true,
    validate: (v) => v.length > 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
