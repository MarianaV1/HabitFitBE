const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const usuariosRouter = require("./routes/usuarios");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
    origin: "https://habit-fit-fe.vercel.app", // URL de tu frontend
    credentials: true,
}));

// Rutas
app.use("/api/usuarios", usuariosRouter);
app.use("/api/rutinas", require("./routes/rutinas"));
app.use("/api/progreso", require("./routes/progreso"));


if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // Exporta solo `app` para pruebas