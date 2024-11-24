const request = require("supertest");
const app = require("../server");

let token;
let rutinaId;

beforeAll(async () => {
    // Crea un usuario de prueba
    await request(app).post("/api/usuarios/registro").send({
        nombre: "joel",
        email: "prueba@example.com",
        contraseña: "contraseña123",
        metas: {
            peso: 70,
            entrenamientos_semanales: 4,
            hábitos: ["Beber agua"],
        },
    });

    // Obtén el token de autenticación
    const res = await request(app).post("/api/usuarios/login").send({
        email: "prueba@example.com",
        contraseña: "contraseña123",
    });
    token = res.body.token;
});

describe("Gestión de rutinas", () => {
    it("Debería crear una rutina con datos válidos", async () => {
        const res = await request(app)
            .post("/api/rutinas")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nombre_rutina: "Rutina de Piernas",
                frecuencia: "Lunes y Miércoles",
                ejercicios: [
                    { nombre: "Sentadillas", series: 3, repeticiones: 12, peso: 50 },
                ],
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.nombre_rutina).toBe("Rutina de Piernas");

        // Guarda el ID de la rutina creada para las pruebas posteriores
        rutinaId = res.body._id;
    });

    it("Debería eliminar una rutina existente", async () => {
        const res = await request(app)
            .delete(`/api/rutinas/${rutinaId}`) // Usa el ID guardado
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200); // Código de éxito
        expect(res.body.message).toBe("Rutina eliminada correctamente"); // Mensaje esperado
    });
});
