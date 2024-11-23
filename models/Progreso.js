const mongoose = require("mongoose");

const progresoSchema = mongoose.Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    fecha: { type: Date, required: true },
    actividades_completadas: [String],
    calorias_consumidas: Number,
    tiempo_entrenado: Number,
}, { timestamps: true });

module.exports = mongoose.model("Progreso", progresoSchema);
