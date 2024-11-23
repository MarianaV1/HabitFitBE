const express = require("express");
const { crearRutina, obtenerRutinas } = require("../controllers/rutinas");
const protegerRuta = require("../middleware/autenticar");
const router = express.Router();

router.post("/", protegerRuta, crearRutina);
router.get("/", protegerRuta, obtenerRutinas);

module.exports = router;
