const { Router } = require("express");
const { check } = require("express-validator");
const {
  grupoGet,
  grupoGets,
  grupoPost,
  grupoPut,
  grupoDelete,
} = require("../controllers/grupos");

const router = Router();

router.get("/", [], grupoGet);

router.get("/:id", [], grupoGets);

router.post("/", [], grupoPost);

router.put("/:id", [], grupoPut);

router.delete("/:id", [], grupoDelete);

module.exports = router;
