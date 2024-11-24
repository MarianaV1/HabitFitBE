const Progreso = require("../models/Progreso");

// Registrar progreso
const registrarProgreso = async (req, res) => {
    try {
        const { fecha, actividades_completadas, calorias_consumidas, tiempo_entrenado } = req.body;

        const nuevoProgreso = new Progreso({
            usuario_id: req.usuario.id,
            fecha,
            actividades_completadas,
            calorias_consumidas,
            tiempo_entrenado,
        });

        const progresoGuardado = await nuevoProgreso.save();
        res.status(201).json(progresoGuardado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener progreso por usuario
const obtenerProgreso = async (req, res) => {
    try {
        const { desde, hasta } = req.query;

        // Filtro por rango de fechas opcional
        const filtro = { usuario_id: req.usuario.id };
        if (desde || hasta) {
            filtro.fecha = {};
            if (desde) filtro.fecha.$gte = new Date(desde);
            if (hasta) filtro.fecha.$lte = new Date(hasta);
        }

        const progreso = await Progreso.find(filtro).sort({ fecha: -1 }); // Ordenado por fecha descendente
        res.json(progreso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registrarProgreso, obtenerProgreso };
