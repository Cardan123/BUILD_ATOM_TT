const { Router } = require("express");
const { check } = require("express-validator");
const {
  comentariosGet,
  comentarioGet,
  comentarioPut,
  comentarioPost,
  comentarioDelete,
} = require("../controllers/comentarios");

const router = Router();

router.get("/", [], comentariosGet);

router.get("/:id", [], comentarioGet);

router.post("/", [], comentarioPost);

router.put("/:id", [], comentarioPut);

router.delete("/:id", [], comentarioDelete);

module.exports = router;
