const db = require('../Config/db.config.js');
const Usuario = db.Usuario;

exports.create = (req, res) => {
  let usuario = {};

  try {
    usuario.nombre = req.body.nombre;
    usuario.apellido = req.body.apellido;
    usuario.email = req.body.email;
    usuario.telefono = req.body.telefono;
    usuario.direccion = req.body.direccion;
    usuario.fechaRegistro = req.body.fechaRegistro;
    usuario.estado = req.body.estado;

    Usuario.create(usuario).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.id}`,
        usuario: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
}
};

exports.retrieveAllUsuario = (req, res) => {
Usuario.findAll()
  .then(usuarioInfo => {
    res.status(200).json({
      message: "Usuarios recuperados exitosamente!",
      usuarios: usuarioInfo
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener usuarios!",
      error: error.message
    });
  });
};

exports.getUsuarioById = (req, res) => {
let usuarioId = req.params.id;
Usuario.findByPk(usuarioId)
.then(usuario => {
    if (usuario) {
      res.status(200).json({
        message: `Usuario obtenido con id = ${usuarioId}`,
        usuario: usuario
      });
    } else {
      res.status(404).json({
        message: `No se encontró el usuario con id = ${usuarioId}`
      });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "No fue posible obtener el usuario",
      error: error.message
    });
  });
};

exports.updateById = async (req, res) => {
try {
  let usuarioId = req.params.id;
  let usuario = await Usuario.findByPk(usuarioId);
  if (!usuario) {
    res.status(404).json({
      message: `No fue posible actualizar el usuario con id = ${usuarioId}`,
      usuario: "",
      error: "404"
    });
  } else {
    let updatedObject = {
      nombre: req.body.nombreLibro,
      apellido: req.body.editorial,
      email: req.body.autor,
      telefono: req.body.genero,
      direccion: req.body.paisAutor,
      fechaRegistro: req.body.numPaginas,
      estado: req.body.anioEdicion,
    };
    let result = await Usuario.update(updatedObject, { returning: true, where: { idUsuario: usuarioId } });

    if (!result) {
      res.status(500).json({
        message: "Error -> No fue posible actualizar el usuario con id = " + req.params.id,
        error: "Can NOT Updated"
      });
    }

    res.status(200).json({
      message: `Usuario actualizado con éxito, id = ${usuarioId}`,
      usuario: updatedObject
    });
  }
} catch (error) {
  res.status(500).json({
    message: "Error -> No se puede actualizar el usuario con id = " + req.params.id,
    error: error.message
  });
}
};

exports.deleteById = async (req, res) => {
try {
  let usuarioId = req.params.id;
  let usuario = await Usuario.findByPk(usuarioId);

  if (!usuario) {
    res.status(404).json({
      message: `No existe el usuario con id = ${usuarioId}`,
      error: "404"
    });
} else {
    await usuario.destroy();
    res.status(200).json({
      message: `Usuario eliminado con éxito, id = ${usuarioId}`,
      usuario: usuario
    });
  }
} catch (error) {
  res.status(500).json({
    message: "Error -> No se puede eliminar el usuario con id = " + req.params.id,
    error: error.message
  });
}
};