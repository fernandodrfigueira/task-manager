const User = require("../models/user.model")
const { deleteFile } = require("../../utils/deleteFileCloud")

const addUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.profilepic = req.file.path;
        const createdUser = await newUser.save();
        return res.status(200).json({ message: "Usuario creado", data: createdUser })

    } catch (error) {
        console.log(error)
    }
}

const addTaskToUser = async (req, res) => {
    const { idT, idU } = req.params;
    console.log(idT, idU)

    const modifyUser = await User.findByIdAndUpdate(
        idU,
        { $push: { task: idT } },
        { new: true })

    if (!modifyUser) {
        return res.json({ message: "Usuario  no encontrado" })
    } else {
        return res.json({ message: "Usuario modificado con exito", data: modifyUser })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.query;
    const user = await User.findById(id).populate("task")
    if (!user) {
        return res.json({ message: "usuario no existe" })
    } else {
        return res.json({ data: user })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.query;
    const delUser = await User.findByIdAndDelete(id)
    if (!delUser) {
        return res.json({ message: "usuario no encontrado"})
    } else {
        deleteFile(delUser.profilepic);
        return res.json({ message: "usuario eliminado" })
    }

}

const deleteTaskUser = async (req, res) => {
    const { idT, idU } = req.query;
    //encontrar el usuario y modificarlo
    //$pull --> elimina del array
    const updatedUser = await User.findByIdAndUpdate(
        idU,
        { $pull: { task: idT } }, // $pull permite eliminar un elemnto del array
        { new: true }
    )
    return res.json({ data: updatedUser })
    // buscar al usuario, sacar el elemento del array (filter, splice, slice), guardar los datos del usuario save()
}

module.exports = { addUser, addTaskToUser, getUserById, deleteUser, deleteTaskUser }