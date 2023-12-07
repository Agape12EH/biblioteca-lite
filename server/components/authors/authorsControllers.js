import Datastore from 'nedb';
const db = new Datastore({ filename: './databases/autores.db', autoload: true });

const getAll = (req, res) => {
  db.find({}, (err, autores) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching autores", details: err.message });
    }
    res.json({ autores });
  });
};

const getOne = (req, res) => {
  db.findOne({ _id: req.params.id }, (err, autor) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching autor", details: err.message });
    }
    if (!autor) {
      return res.status(404).json({ message: "Autor not found" });
    }
    res.json({ autor });
  });
};

const create = (req, res) => {
  try {
    const { nombre, fecha_nacimiento, nacionalidad, premios, enlaces } = req.body;

    if (!nombre || !fecha_nacimiento || !nacionalidad || !premios || !enlaces) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const nuevoAutor = { nombre, fecha_nacimiento, nacionalidad, premios, enlaces };

    db.insert(nuevoAutor, (err, autorInsertado) => {
      if (err) {
        return res.status(500).json({ error: "Error creating autor", details: err.message });
      }
      res.json({ message: "Autor created successfully", autor: autorInsertado });
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating autor", details: error.message });
  }
};

const update = (req, res) => {
  try {
    // Buscar el autor por su ID
    db.findOne({ _id: req.params.id }, (err, autor) => {
      if (err) {
        return res.status(500).json({ error: "Error finding autor", details: err.message });
      }

      // Verificar si el autor fue encontrado
      if (!autor) {
        return res.status(404).json({ message: "Autor not found" });
      }

      // Actualizar los campos del autor con los proporcionados en el cuerpo de la solicitud
      autor.nombre = req.body.nombre || autor.nombre;
      autor.fecha_nacimiento = req.body.fecha_nacimiento || autor.fecha_nacimiento;
      autor.nacionalidad = req.body.nacionalidad || autor.nacionalidad;
      autor.premios = req.body.premios || autor.premios;
      autor.enlaces = req.body.enlaces || autor.enlaces;

      // Actualizar el autor en la base de datos NeDB
      db.update({ _id: req.params.id }, autor, {}, (updateErr) => {
        if (updateErr) {
          return res.status(500).json({ error: "Error updating autor", details: updateErr.message });
        }

        // Devolver el autor actualizado en la respuesta
        res.json({ message: "Autor updated successfully", autor });
      });
    });
  } catch (error) {
    // Manejar otros errores
    res.status(500).json({ error: "Error updating autor", details: error.message });
  }
};

const destroy = (req, res) => {
  db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting autor", details: err.message });
    }
    if (numRemoved === 0) {
      return res.status(404).json({ message: "Autor not found" });
    }
    res.json({ message: "Autor deleted successfully", numRemoved });
  });
};

export default { getAll, getOne, create, update, destroy };