const { Router } = require("express");
const { check } = require("express-validator");
const {
  publicacionGet,
  publicacionesGet,
  publicacionPost,
  publicacionPut,
  publicacionDelete,
} = require("../controllers/publicaciones");

const router = Router();

router.get("/", [], publicacionesGet);

router.get("/:id", [], publicacionGet);

router.post("/", [], publicacionPost);

router.put("/:id", [], publicacionPut);

router.delete("/:id", [], publicacionDelete);

module.exports = router;
