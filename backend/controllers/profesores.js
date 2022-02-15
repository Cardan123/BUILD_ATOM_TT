const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const { Profesor } = require("../models/profesores");

const profesoresGet = (req = request, res = response) => {
  res.status(200).json({ msg: "ok" });
};

const profesoresPost = async (req = request, res = response) => {
  const { body } = req;
  console.log(body);

  try {
    const existeEmail = await Profesor.findOne({
      where: { email: body.email },
    });

    if (existeEmail)
      return res
        .status(400)
        .json({ msg: `Ya existe un usuario con este email ${body.email}` });

    const usuario = await Profesor.build(body);

    await usuario.save();

    res.status(201).json({ usuario });
  } catch (err) {}
};

const profesoresPut = (req = request, res = response) => {};

const profesoresDelete = (req = request, res = response) => {};

module.exports = {
  profesoresGet,
  profesoresPost,
  profesoresPut,
  profesoresDelete,
};
