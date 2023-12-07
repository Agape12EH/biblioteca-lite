const supertest = require('supertest');
const app = require('../../../app/app.js'); // Asegúrate de que la ruta sea correcta
const Datastore = require('nedb');

// Crea una instancia de la base de datos NeDB para las pruebas
const testDB = new Datastore({ filename: './databases/autores.db', autoload: true });

const autorDePrueba = {
  _id:'ID de autor',
  nombre: 'Nuevo Autor',
  fecha_nacimiento: '1990-01-01',
  nacionalidad: 'Nacionalidad',
  premios: ['Premio 1', 'Premio 2'],
  enlaces: ['Enlace 1', 'Enlace 2'],
};


beforeAll(async () => {
  // Inserta el autor de prueba antes de ejecutar las pruebas
  await testDB.insert(autorDePrueba);
});


describe('PUT /autores/:id', () => {
  it('should update an author by ID', async () => {
    // Datos de actualización
    const datosDeActualizacion = {
      nombre: 'Nuevo Nombre',
      nacionalidad:'Peru' ,
    };

    // Imprime el _id y los datos de actualización para depuración
    console.log('ID del autor de prueba:', autorDePrueba._id);
    console.log('Datos de actualización:', datosDeActualizacion);

    const response = await supertest(app)
      .put(`/autores/${autorDePrueba._id}`)
      .send(datosDeActualizacion);

    // Imprime la respuesta para depuración
    console.log('Respuesta de la solicitud PUT:', response.body);

    // Asegúrate de manejar la respuesta según tus necesidades
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Autor updated successfully');
    expect(response.body).toHaveProperty('autor');
    expect(response.body.autor).toHaveProperty('nombre', datosDeActualizacion.nombre);

    // Verifica que los libros escritos se hayan actualizado correctamente
    datosDeActualizacion.escritos.forEach((libroActualizado, index) => {
      expect(response.body.autor.escritos[index]).toEqual(libroActualizado);
    });
  });

  // ... (código anterior)
});


// Después de que se ejecutan las pruebas, limpia la base de datos de prueba
afterAll(async () => {
  await testDB.remove({}, { multi: true });
});
