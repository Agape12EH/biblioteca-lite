const supertest = require('supertest');
const app = require('../../../app/app.js'); // Asegúrate de que la ruta sea correcta

describe('GET /autores/', () => {
  it('should get all authors', async () => {
    // Supongamos que inicializas algunos datos de prueba antes de ejecutar la prueba

    const response = await supertest(app).get('/autores');

    // Asegúrate de manejar la respuesta según tus necesidades
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('autores');
    expect(Array.isArray(response.body.autores)).toBe(true);

    console.log('Lista de autores:', response.body.autores);

    // Puedes realizar más aserciones según la estructura de tus datos
    // Por ejemplo, si sabes que cada autor debe tener una propiedad 'nombre'
    // puedes hacer algo como esto:
    if (response.body.autores.length > 0) {
      const primerAutor = response.body.autores[0];
      expect(primerAutor).toHaveProperty('nombre');
    }
  });
});
