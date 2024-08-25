const jwt = require("jsonwebtoken")
const User = require("../models/user.model")


const register = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const createdUser = await newUser.save();
        return res.status(200).json({ message: "Usuario creado", data: createdUser })

    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne(
        {email: email}
    )
    if (!user) {
        return res.status(403).json({ message: "Error en las credenciales" })
    }
    if (user.password == password) {
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.status(200).json({ token, user })
    }
    else {
        return res.status(403).json ({ message: "Error en las credenciales" })
    }
}

module.exports = { register, login }