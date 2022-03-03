const { Router } = require("express");
const { check } = require("express-validator");
const {
  calificacionesGet,
  calificacionGet,
  calificacionPost,
  calificacionPut,
  calificacionDelete,
} = require("../controllers/calificaciones");

const router = Router();

router.get("/", [], calificacionesGet);

router.get("/:id", [], calificacionGet);

router.post("/", [], calificacionPost);

router.put("/:id", calificacionPut);

router.delete("/:id", [], calificacionDelete);

module.exports = router;
