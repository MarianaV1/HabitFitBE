const request = require("supertest");
const app = require("../server");

let token;

beforeAll(async () => {
    // Crea un usuario de prueba y obtén un token
    await request(app).post("/api/usuarios/registro").send({
        nombre: "Juan Pérez",
        email: "progreso@example.com",
        contraseña: "contraseña123",
        metas: {
            peso: 70,
            entrenamientos_semanales: 4,
            hábitos: ["Beber agua"],
        },
    });

    const res = await request(app).post("/api/usuarios/login").send({
        email: "progreso@example.com",
        contraseña: "contraseña123",
    });
    token = res.body.token;
});

describe("Registro de progreso", () => {
    it("Debería fallar al registrar progreso con datos incompletos", async () => {
        const res = await request(app)
            .post("/api/progreso")
            .set("Authorization", `Bearer ${token}`) // Usa el token obtenido
            .send({
                calorias_consumidas: 300, // Falta fecha y actividades
            });
        expect(res.statusCode).toBe(400); // Código de error esperado
    });
});
