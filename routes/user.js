const router = require('express').Router();
const userHandler = require("../handlers/user");
const userControllers = require("../controllers/user");
const authenticator = require("../middlewares/authenticator");


router.post("/signup", userHandler.userHandler, userControllers.Signup);
router.post("/signin", userControllers.Signin);


module.exports = router;


