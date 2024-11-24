const request = require("supertest");
const app = require("../server");

describe("Inicio de sesión", () => {
    it("Debería iniciar sesión con credenciales válidas", async () => {
        const res = await request(app).post("/api/usuarios/login").send({
            email: "mariana@gmail.com",
            contraseña: "mariana123",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    it("Debería fallar con credenciales inválidas", async () => {
        const res = await request(app).post("/api/usuarios/login").send({
            email: "mariana@gmail.com",
            contraseña: "incorrecta",
        });
        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe("Credenciales inválidas");
    });
});
