const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const { Profesor } = require("../models/profesores");

const profesoresGet = async (req = request, res = response) => {
  const profesores = await Profesor.findAll();

  res.json({ profesores });
};

const profesoresGets = async (req = request, res = response) => {
  const { id } = req.params;

  const profesor = await Profesor.findByPk(id);

  if (profesor) res.json({ profesor });
  else res.status(401).json({ msg: `No existe un profesor con el id ${id}` });
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

const profesoresPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;

  console.log(body);

  try {
    const profesor = await Profesor.findByPk(id);
    if (!profesor)
      res.status(404).json({ msg: `No existe un profesor con el id ${id}` });

    await profesor.update(body);
    // await profesor.save();

    res.status(200).json(profesor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};

const profesoresDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const profesor = await Profesor.findByPk(id);
  if (!profesor)
    res.status(404).json({ msg: `No existe un profesor con el id ${id}` });

  // await profesor?.destroy();
  await profesor?.update({ estado: false });

  res.json({ profesor });
};

module.exports = {
  profesoresGet,
  profesoresGets,
  profesoresPost,
  profesoresPut,
  profesoresDelete,
};
