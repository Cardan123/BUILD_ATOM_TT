const { Router } = require("express");
const { check } = require("express-validator");
const {
  alumnosGet,
  alumnoGet,
  alumnoPost,
  alumnoPut,
  alumnoDelete,
} = require("../controllers/alumnos");

const router = Router();

router.get("/", [], alumnosGet);

router.get("/:id", [], alumnoGet);

router.post("/", [], alumnoPost);

router.put("/:id", [], alumnoPut);

router.delete("/:id", [], alumnoDelete);

module.exports = router;
