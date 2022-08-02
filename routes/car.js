const express = require("express");

const carControllers = require("../controllers/car");
const { findById } = require("../models/car");

// const authenticator = require("../middlewares/authenticator");

const router = express.Router();

router.post("/carpost", carControllers.uploadCar);
router.get("/getcar", carControllers.getCar);
router.get("/:id", carControllers.findById);
module.exports = router;