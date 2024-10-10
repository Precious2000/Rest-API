const express = require("express");
const db = require("./database.js");
const Player = require("./models/user"); //importing schemas
const mongoose = require("mongoose"); //importing mongoose
const ObjectId = mongoose.Types.ObjectId;

const app = express();
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.listen(145, () => {
  console.log(`app listening on port 145`);
});

app.get = async (req, res) => {
  try {
    const player = await Player.find();
    res.status(201).send({
      status: "success",
      count: player.length,
      data: player,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
app.post = async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).send({
      status: "sucess",
      message: "player created sucessfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
app.put = async (req, res) => {
  try {
    const playerId = req.params.id;
    const updateData = req.body;
    const player = await Course.findByIdAndUpdate(playerId, updateData, {
      new: true,
    });

    if (!player) {
      return res.status(404).send({
        status: "error",
        message: "player not found",
      });
    }

    res.status(200).send({
      status: "success",
      data: player,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

app.delete = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await Player.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "player not found" });
    }

    res.status(200).json({ message: "player deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
