const express = require("express");
const router = express.Router();
const User = require("../models/user");
const tokens = require("../utils/tokens");

router.post("/register", async function (req, res, next) {
    try {
      const user = await User.register(req.body);
      const token = tokens.generateUserToken(user);
      return res.status(201).json({ user, token });
    } catch (err) {
      next(err);
    }
  });

module.exports = router;