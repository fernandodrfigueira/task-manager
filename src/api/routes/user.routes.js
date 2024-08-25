const express = require("express");
const router = express.Router()
const { addUser, addTaskToUser, getUserById, deleteUser, deleteTaskUser } = require("../controllers/user.controllers")
const upload = require("../middleware/upload.middleware")
const { verifyToken, isAdmin } = require("../middleware/auth.middleware")

router.post("/add", verifyToken, upload.single("profilepic"), addUser);
router.put("/addTask/:idT/:idU", verifyToken, addTaskToUser)
router.get("/getById", verifyToken, getUserById)
router.delete("/remove", verifyToken, isAdmin, deleteUser)
router.put("/deleteTask", verifyToken, deleteTaskUser)
module.exports = router
