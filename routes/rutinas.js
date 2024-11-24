const express = require("express");
const { crearRutina, obtenerRutinas, eliminarRutina } = require("../controllers/rutinas");
const protegerRuta = require("../middleware/autenticar");
const router = express.Router();

router.post("/", protegerRuta, crearRutina);
router.get("/", protegerRuta, obtenerRutinas);
router.delete("/:id", eliminarRutina);

module.exports = router;
