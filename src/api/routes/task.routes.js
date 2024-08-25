const express = require("express");
const router = express.Router();
const { getTasks, getTaskByTitle, add, deleteTask, updateTask, toggleStatus } = require("../controllers/task.controllers");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware")

router.get("/gettasks", verifyToken, getTasks);
router.get("/getByTitle/:title", verifyToken, getTaskByTitle);
router.post("/addTask", verifyToken, isAdmin, add);
router.delete("/delete/:id", verifyToken, isAdmin, deleteTask);

//el id lo vamos a enviar a traves de los query
router.put("/updateTask", verifyToken, isAdmin, updateTask);
router.put("/toggleTaskStatus", verifyToken, toggleStatus)


module.exports = router