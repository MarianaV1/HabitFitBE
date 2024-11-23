const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, contraseña, metas } = req.body;
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) return res.status(400).json({ error: "El email ya está registrado" });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(contraseña, salt);

        const nuevoUsuario = new Usuario({ nombre, email, contraseña: hash, metas });
        const usuarioGuardado = await nuevoUsuario.save();

        res.status(201).json(usuarioGuardado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (!usuario || !(await bcrypt.compare(contraseña, usuario.contraseña))) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, usuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registrarUsuario, loginUsuario };
