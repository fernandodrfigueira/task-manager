const express = require("express");
const router = express.Router()
const { addUser, addTaskToUser, getUserById, deleteTaskUser } = require("../controllers/user.controllers")
const { verifyToken } = require("../middleware/auth.middleware")

router.post("/add", verifyToken, addUser);
router.put("/addTask/:idT/:idU", verifyToken, addTaskToUser)
router.get("/getById", verifyToken, getUserById)
router.put("/deleteTask", verifyToken, deleteTaskUser)
module.exports = router
