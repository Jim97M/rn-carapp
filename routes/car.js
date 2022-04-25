const express = require("express");

const carControllers = require("../controllers/car");

// const authenticator = require("../middlewares/authenticator");

const router = express.Router();

router.post("/carpost", carControllers.uploadImage );

module.exports = router;