require("dotenv").config();
const User = require("./model");
const { connect } = require("mongoose");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const mongoose = require("mongoose");

const signup = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    await connect(process.env.MONGO_URL);
    console.log("Db connected");

    const existingUser = await User.exists({ email: email });
    if (existingUser) {
      return res.status(208).json({
        message: "User Already Exists",
      });
    } else {
      await User.create({
        username,
        email,
        password: await hash(password, 12),
      });
      res.status(201).json({
        message: "Done",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error occurred",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    await connect(process.env.MONGO_URL);
    const checkExistUser = await User.findOne({ email: email });
    if (!checkExistUser) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      const decryptPass = await compare(password, checkExistUser.password);
      console.log("login result", decryptPass);

      if (email == checkExistUser.email && decryptPass) {
        const token = sign(
          {
            username: checkExistUser.username,
            id: checkExistUser._id,
            email: checkExistUser.email,
          },
          process.env.JWT_SECRET
        );

        res.status(200).json({
          message: "Successfully Login",
          token: token,
        });
      } else {
        res.json({
          message: "invalid Credentials",
        });
      }

      // res.json({
      //   user: checkExistUser,
      // });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//delete user
const deleteUser = async (req, res) => {
  const { _id } = req.body;

  try {
    await User.deleteOne({ _id });

    res.json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports = { signup, login, deleteUser };
