const express = require("express");
const router = express.Router();
const { getTasks, getTaskById, add, deleteTask, updateTask, toggleStatus } = require("../controllers/task.controllers");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware")

router.get("/gettasks", verifyToken, getTasks);
router.get("/getById/:taskId", verifyToken, getTaskById);
router.post("/addTask", verifyToken, isAdmin, add);
router.delete("/delete/:id", verifyToken, isAdmin, deleteTask);

router.put("/updateTask", verifyToken, isAdmin, updateTask);
router.put("/toggleTaskStatus", verifyToken, toggleStatus)


module.exports = router