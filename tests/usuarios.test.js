const request = require("supertest");
const app = require("../server");

describe("Registro de usuario", () => {
    it("Debería registrar un usuario con datos válidos", async () => {
        const res = await request(app).post("/api/usuarios/registro").send({
            nombre: "Benjamin Ramirez",
            email: "benjamin@gmail.com",
            contraseña: "contraseña123",
            metas: {
                peso: 70,
                entrenamientos_semanales: 4,
                hábitos: ["Beber agua"],
            },
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.email).toBe("benjamin@gmail.com");
    });

    it("Debería fallar al registrar un usuario con un email existente", async () => {
        const res = await request(app).post("/api/usuarios/registro").send({
            nombre: "Benjamin",
            email: "benjamin@gmail.com", // Email ya registrado
            contraseña: "contraseña123",
            metas: {
                peso: 70,
                entrenamientos_semanales: 4,
                hábitos: ["Beber agua"],
            },
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("El email ya está registrado");
    });
});
