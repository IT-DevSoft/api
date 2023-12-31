const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/sign_in", userController.signIn);
router.post("/sign_up", userController.signUp);

module.exports = router;
