const express = require("express");
const { register, login } = require("../controllers/login.controller");
const router = express.Router();


router.post("/login", login);

module.exports = router