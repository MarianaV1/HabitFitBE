const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contraseña: {
        type: String,
        required: true,
    },
    metas: {
        peso: Number,
        entrenamientos_semanales: Number,
        hábitos: [String],
    },
}, { timestamps: true });

module.exports = mongoose.model("Usuario", usuarioSchema);
