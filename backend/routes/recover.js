const { Router } = require("express");
const { check } = require("express-validator");
const { recoverPassword } = require("../controllers/recover");

const router = Router();

router.post("/:coleccion", [], recoverPassword);

module.exports = router;
