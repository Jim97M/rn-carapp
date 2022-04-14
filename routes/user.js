const express = require('express');
const userHandler = require("../handlers/user");
const userControllers = require("../controllers/user");
const authenticator = require("../middlewares/authenticator");

const router = express.Router();

router.post("/signup", userHandler.userHandler, userControllers.signup);
router.get("/signin", userControllers.Signin);