const express = require("express");
const router = express.Router();
const User = require("../models/user");
const tokens = require("../utils/tokens");
const moduleinfo = require("../modules/modulesInfo.json")


router.get("/me", async function (req, res, next) {
  try {
    //TODO!! CHANGE EMAIL TO DYNAMICALLY GENERATED EMAIL
    const email = "pelumi.tayoorisadare@gmail.com";
    const userInfo = await User.fetchUserByEmail(email);
    const { user, goals, quizzes } = await User._createPublicUser(userInfo);
    return res.status(201).json({ user, goals, quizzes });
  } catch (err) {
    next(err);
  }
});

router.get("/moduleinfo", async function (req, res, next) {
  try {
    const topic = req.query.topic
    let module = [moduleinfo[topic]]
    return res.status(201).json({ module });


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
    const { user, goals, quizzes } = await User.authenticate(req.body);
    const token = tokens.generateUserToken(user);
    return res.status(201).json({ user, goals, quizzes, token });
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

router.post("/updatequiz", async function (req, res, next) {
  try {
    const quiz = await User.insertQuiz(req.body);
    return res.status(201).json(quiz);
  } catch (err) {
    next(err);
  }
});

router.patch("/totalpoints", async function (req, res, next) {
  try {
    const points = await User.updateTotalPoints(req.body);
    return res.status(201).json(points);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
