const jwt = require("jsonwebtoken");

const protegerRuta = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Acceso no autorizado" });

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido" });
    }
};

module.exports = protegerRuta;
