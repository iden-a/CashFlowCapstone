const express = require("express");
const router = express.Router();
const User = require("../models/user");
const tokens = require("../utils/tokens");

router.get("/me", async function (req, res, next) {
  try {
    const email = "pelumi.tayoorisadare@gmail.com"
    const userInfo = await User.fetchUserByEmail(email);
    const { user, goals } = await User._createPublicUser(
      userInfo
    );
    return res.status(201).json({ user, goals });
  } catch (err) {
    next(err);
  }
});
router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body);
    const token = tokens.generateUserToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const { user, goals} = await User.authenticate(req.body);
    console.log(user, "this is user")
    const token = tokens.generateUserToken(user);
    return res.status(201).json({ user, goals, token });
  } catch (err) {
    next(err);
  }
});

router.post("/goal", async function (req, res, next) {
  try {
    const goal = await User.insertGoal(req.body);
    return res.status(201).json({ goal });
  } catch (err) {
    next(err);
  }
});

// router.post("/updatequiz", async function (req, res, next) {
//   try {
//     const goal = await User.insertGoal(req.body);
//     return res.status(201).json({ goal });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
