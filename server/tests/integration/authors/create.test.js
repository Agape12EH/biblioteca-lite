const supertest = require('supertest');
const app = require ('../../../app/app.js');


describe('POST /autores', () => {

  it('should create a new author', async () => {
    const response = await supertest(app)
      .post('/autores/')
      .send({
        nombre: 'Nuevo Autor',
        fecha_nacimiento: '1990-01-01',
        nacionalidad: 'Nacionalidad',
        premios: ['Premio 1', 'Premio 2'],
        enlaces: ['Enlace 1', 'Enlace 2'],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Autor created successfully');
    expect(response.body).toHaveProperty('autor');

    const autorCreado = response.body.autor;
    // Puedes realizar más aserciones según tu lógica de negocio y la estructura de tu respuesta.
  });

  // Agrega más pruebas según sea necesario.
});
