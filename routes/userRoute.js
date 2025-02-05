const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

// SIGNUP ROUTE
router.post("/signup", async (request, response) => {
  console.log(request.body);
  try {
    const { emailAddress, password } = request.body;
    const existingUser = await User.findOne({ emailAddress });

    if (existingUser) {
      return response
        .status(400)
        .json({ message: "Email address already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      emailAddress,
      password: hashedPassword,
    });

    if (newUser) {
      const verificationToken = jwt.sign({ id: newUser._id }, "nebi", {
        expiresIn: "1h",
      });

      return response.status(201).json({
        message: "User registered successfully",
        token: verificationToken,
      });
    } else {
      return response.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// SIGNIN ROUTE
router.post("/signin", async (request, response) => {
  try {
    const { emailAddress, password } = request.body;
    const user = await User.findOne({ emailAddress });

    if (!user) {
      return response.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return response.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id, islogged: true }, "nebi", {
      expiresIn: "5hr",
    });

    return response
      .status(200)
      .json({ token, emailAddress: user.emailAddress });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;
