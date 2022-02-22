const { Router } = require("express");
const { check } = require("express-validator");
const {
  profesoresGet,
  profesoresPost,
  profesoresPut,
  profesoresDelete,
  profesoresGets,
} = require("../controllers/profesores");

const router = Router();

router.get("/", [], profesoresGet);

router.get("/:id", [], profesoresGets);

router.post("/", [], profesoresPost);

router.put("/:id", [], profesoresPut);

router.delete("/:id", [], profesoresDelete);

module.exports = router;
