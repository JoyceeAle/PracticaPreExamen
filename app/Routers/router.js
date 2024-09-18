let express = require("express");
let router = express.Router();

const autor = require("../Controllers/autor.controller.js");

router.post("/autor/create", autor.create);
router.get("/autor/all", autor.retrieveAllAutor);
router.get("/autor/onebyid/:id", autor.getAutorById);
router.put("/autor/update/:id", autor.updateById);
router.delete("/autor/delete/:id", autor.deleteById);


const libro = require("../Controllers/libro.controller.js");

router.post("/libro/create", libro.create);
router.get("/libro/all", libro.retrieveAllLibro);
router.get("/libro/onebyid/:id", libro.getLibroById);
router.put("/libro/update/:id", libro.updateById);
router.delete("/libro/delete/:id", libro.deleteById);


const usuario = require("../Controllers/usuario.controller.js");

router.post("/usuario/create", usuario.create);
router.get("/usuario/all", usuario.retrieveAllUsuario);
router.get("/usuario/onebyid/:id", usuario.getUsuarioById);
router.put("/usuario/update/:id", usuario.updateById);
router.delete("/usuario/delete/:id", usuario.deleteById);


module.exports = router;
