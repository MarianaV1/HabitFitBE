const express = require("express");
const { registrarProgreso, obtenerProgreso } = require("../controllers/progreso");
const protegerRuta = require("../middleware/autenticar");
const router = express.Router();

// Registrar un nuevo progreso
router.post("/", protegerRuta, registrarProgreso);

// Obtener el progreso del usuario
router.get("/", protegerRuta, obtenerProgreso);

module.exports = router;
