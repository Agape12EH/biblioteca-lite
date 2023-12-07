const supertest = require('supertest');
const app = require('../../../app/app.js');

describe('GET /autores/:id', () => {
  it('should get one author by ID', async () => {
    const autorId = 'omdVjMpjAtstRrp3'; // Supongo que este es un _id válido en tu base de datos

    const response = await supertest(app).get(`/autores/${autorId}`).send();

    // Asegúrate de manejar la respuesta según tus necesidades
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('autor');
    expect(response.body.autor).toHaveProperty('_id', autorId);

    // Imprime en consola el autor encontrado
    console.log('Autor encontrado:', response.body.autor);

    // Puedes agregar más expectativas según la estructura de tu autor
    expect(response.body.autor).toHaveProperty('nombre');
    expect(response.body.autor).toHaveProperty('fecha_nacimiento');
    // ...

    // Si estás trabajando con fechas, puedes usar algo como esto para compararlas
    // expect(new Date(response.body.autor.fecha_nacimiento).toISOString()).toBe('1990-01-01T00:00:00.000Z');
  });

  it('should return 404 for non-existent author', async () => {
    const nonExistentAutorId = 'ID_que_no_existe';
    const response = await supertest(app).get(`/autores/${nonExistentAutorId}`).send();

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Autor not found');
  });
});
