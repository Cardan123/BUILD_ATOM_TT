const { Router } = require("express");
const { check } = require("express-validator");
const {
  ejerciciosGet,
  ejercicioGet,
  ejercicioPost,
  ejercicioPut,
  ejercicioDelete,
} = require("../controllers/ejercicios");

const router = Router();

router.get("/", [], ejerciciosGet);

router.get("/:id", [], ejercicioGet);

router.post("/", [], ejercicioPost);

router.put("/:id", [], ejercicioPut);

router.delete("/:id", [], ejercicioDelete);

module.exports = router;
