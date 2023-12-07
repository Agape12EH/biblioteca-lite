const supertest = require('supertest');
const app = require('../../../app/app.js');

describe('DELETE /autores/:id', () => {
  it('should delete a specific author by ID', async () => {
    // Supongamos que el autor con el ID 'omdVjMpjAtstRrp3' ya existe en la base de datos

    const response = await supertest(app).delete('/omdVjMpjAtstRrp3');

    // Asegúrate de manejar la respuesta según tus necesidades
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Autor deleted successfully');
  });
});
