const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
var mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, department, admin } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        password,
        department,
        admin
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 28800 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .populate("user")
      .select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users
// @desc    Get current user
// @access  Public
router.get("/:id", auth, async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(400).json({ msg: "User not found" });
      res.json(user);
    } else {
      return res.status(400).json({ msg: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "User not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   UPDATE api/users
// @desc    Update a user
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const reqUser = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (reqUser.admin !== true) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const { name, email, department, admin } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (department) user.department = department;
    if (admin === true) {
      user.admin = true;
    } else {
      user.admin = false;
    }

    user.save();

    res.json({ msg: "User Updated" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/users/:id
// @desc    Delete a user
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const reqUser = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    //Check user
    if (reqUser.admin !== true) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await user.remove();

    res.json({ msg: "User removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
