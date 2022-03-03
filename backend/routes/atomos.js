const { Router } = require("express");
const { check } = require("express-validator");
const {
  atomosGet,
  atomoGet,
  atomoPost,
  atomoPut,
  atomoDelete,
} = require("../controllers/atomos");

const router = Router();

router.get("/", [], atomosGet);

router.get("/:id", [], atomoGet);

router.post("/", [], atomoPost);

router.put("/:id", [], atomoPut);

router.delete("/:id", [], atomoDelete);

module.exports = router;
