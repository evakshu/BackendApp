const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORTNUM;

const app = express();

const MONGB_UR = process.env.DATABASE_URL;
// console.log(MONGB_UR);

app.use(express.json());
app.use(cors());
mongoose.connect(MONGB_UR);
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("mongodb connection error ", err);
});

db.once("open", () => {
  console.log("mongo is connected");
});

const userSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Father: String,
  Address: String,
  Adhar_number: Number,
  Mobile_Number: Number,
  Pin_Code: Number,
});

const User = mongoose.model("User", userSchema);
app.post("/register", async (req, res) => {
  try {
    const NewUser = new User({
      Name: req.body.Name,
      Father: req.body.Father,
      Email: req.body.Email,
      Address: req.body.Address,
      Adhar_number: req.body.Adhar_number,
      Mobile_Number: req.body.Mobile_Number,
      Pin_Code: req.body.Pin_Code,
    });
    const savedUser = await NewUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error during registration", error);
    res.status(500).json({ error: "inter server error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server Listening at ${PORT}`);
});
