const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profilepic: {type: String, require: false},
    position: { type: String },
    role: { type: String, require: true, enum: ["admin", "usuario"], default: "usuario" },
    task: [{ type: Schema.Types.ObjectId, ref: "task" }]
},
    {
        collection: "user",
        timestamps: true 
    })
const User = mongoose.model("user", userSchema)
module.exports = User;