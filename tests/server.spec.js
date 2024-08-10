const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("GET/CAFES ", async () => {
    const response = await request(server).get("/cafes");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(1);
    
  });

  it("DELETE/CAFES/ID ", async () => {
    const nonExistentId = 9999; // Un ID que seguramente no existe en la base de datos
    const response = await request(server).delete(`/cafes/${nonExistentId}`);
    expect(response.statusCode).toBe(400);
    
    
  });

  it("POST/CAFES/ID ", async () => {
    const nuevoCafe = {
        id: 123,
        nombre: 'Café Espresso',
        descripcion: 'Un café fuerte y oscuro.',
      };
    const response = await (await request(server).post("/cafes").send(nuevoCafe));
    expect(response.statusCode).toBe(201);
    
    
  });

 

  it("PUT/CAFES/ID ", async () => {
    const idParam = 1; // ID en los parámetros
    const payload = {
      id: 2, // ID en el cuerpo de la solicitud (diferente al parámetro)
      nombre: 'Americano',
     
    };
    const response =  await request(server).put(`/cafes/${idParam}`).send(payload);
    expect(response.statusCode).toBe(400);
    
    
  });







});
