const { Router } = require("express");
const { check } = require("express-validator");
const {
  archivosPost,
  archivosPut,
  archivosGet,
  archivosDelete,
} = require("../controllers/uploads");

const router = Router();

router.post("/", [], archivosPost);

router.put("/:coleccion/:id", [], archivosPut);

router.get("/:coleccion/:id", [], archivosGet);

router.delete("/:coleccion/:id", [], archivosDelete);

module.exports = router;
