const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String, require: true },
    project: { type: String, require: true },
    category: { type: String },
    status: { type: String, require: true, enum: ["pendiente", "completada"], default: "pendiente" }
}, {
    collection: "task"
})
const Task = mongoose.model("task", taskSchema)
module.exports = Task;