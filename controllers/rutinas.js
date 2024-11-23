const Rutina = require("../models/Rutina");

const crearRutina = async (req, res) => {
    try {
        const rutina = new Rutina({ ...req.body, usuario_id: req.usuario.id });
        const rutinaGuardada = await rutina.save();
        res.status(201).json(rutinaGuardada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerRutinas = async (req, res) => {
    try {
        const rutinas = await Rutina.find({ usuario_id: req.usuario.id });
        res.json(rutinas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { crearRutina, obtenerRutinas };
