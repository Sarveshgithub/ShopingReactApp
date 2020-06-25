import express from "express";
import User from "../models/userModel";
import { getToken } from "../util";

const router = express.Router();
router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ message: "Invalid Email or Password." });
  }
});

router.post("/register", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(400)
      .send({ status: "error", message: "That user already exisits!" });
  } else {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const newUser = await user.save();
      if (newUser) {
        res.send({
          status: "success",
          response: {
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
          },
        });
      } else {
        res
          .status(401)
          .send({ status: "error", message: "Invalid User Data." });
      }
    } catch (error) {
      res.send({ message: error.message });
    }
  }
});
router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Basir",
      email: "basir.jafarzadeh@gmail.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default router;
