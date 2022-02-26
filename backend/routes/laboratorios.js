const { Router } = require("express");
const { check } = require("express-validator");
const {
  laboratoriosGet,
  laboratorioGet,
  laboratorioPost,
  laboratorioPut,
  laboratorioDelete,
} = require("../controllers/laboratorios");

const router = Router();

router.get("/", [], laboratoriosGet);

router.get("/:id", [], laboratorioGet);

router.post("/", [], laboratorioPost);

router.put("/:id", [], laboratorioPut);

router.delete("/:id", [], laboratorioDelete);

module.exports = router;
