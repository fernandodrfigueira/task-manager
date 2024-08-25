const express = require("express");
const { connectDB } = require("./src/utils/db")
const router = require("./src/api/routes/task.routes")
const routerUser = require("./src/api/routes/user.routes")
const routerLogin = require("./src/api/routes/login.routes")
const env = require("dotenv")
env.config()

const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

connectDB();
const server = express();
const PORT = 3000; // usamos la variable de entorno PORT

server.use(express.json())
server.use("/", router)
server.use("/user", routerUser)
server.use("/auth", routerLogin)


server.listen(PORT, () => {
    console.log(`listen port http://localhost:${PORT} `)
})

// modelos --> estructuras de BD (colecciones),
// vistas, --> routes
// controladores--> funcionalidad para acceder a la BD
//utils--> funciones de validaciones, conexion de BD, middleware