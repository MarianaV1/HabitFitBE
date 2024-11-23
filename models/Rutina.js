const mongoose = require("mongoose");

const rutinaSchema = mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    nombre_rutina: {
        type: String,
        required: true,
    },
    ejercicios: [
        {
            nombre: String,
            repeticiones: Number,
            series: Number,
            peso: Number,
        },
    ],
    frecuencia: String, // Ejemplo: "Lunes, Miércoles, Viernes"
}, { timestamps: true });

module.exports = mongoose.model("Rutina", rutinaSchema);
