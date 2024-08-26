const { response } = require("express");
const Task = require("../models/task.model")

const getTasks = async (req, res) => {
    // aqui es donde se usará el modelo de datos
    try {
        const listTasks = await Task.find();
        res.json(listTasks)
    } catch (error) {
        console.log(error)
    }
}

const getTaskById = async (req, res) => {
    const { taskId } = req.params;
    const taskById = await Task.findById(taskId);

    res.json(taskById)
}

const add = async (req, res) => {
    try {
        const newTask = req.body;
        const findTask = await Task.find({ title: newTask.title })
        if (findTask.length === 0) {
            const task = new Task(newTask)
            const createdTask = await task.save()
            res.status(201).json(createdTask)
        } else {
            res.status(200).json({ message: "La tarea está repetida" })
        }
    } catch (error) {

    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTsk = await Task.findByIdAndDelete(id);
        if (deleteTsk) {
            res.status(201).json({ success: true, message: deleteTsk })
        } else {
            res.status(200).json({ success: false, message: "No existe el id" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.query;
        const taskBody = req.body;
        console.log(req.query)
        console.log(taskBody)
        const updateTask = await Task.findByIdAndUpdate(id, taskBody, { new: true })

        if (!updateTask) {
            res.json({ success: false, message: "el id no existe" })
        } else {
            res.json(updateTask)
            console.log(updateTask)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
const toggleStatus = async (req, res) => {
    try {
        const { id } = req.query;
        const task = await Task.findById(id)
        if (!task) { res.status(404).json ({message: "La tarea no existe"})}
        if (task.status === "completada"){
            task.status = "pendiente"
        } else {task.status = "completada"
        }
        const toggledTask = await Task.findByIdAndUpdate(id, task, { new: true})
        res.json(toggledTask)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


module.exports = { getTasks, getTaskById, add, getTaskById, deleteTask, updateTask, toggleStatus }