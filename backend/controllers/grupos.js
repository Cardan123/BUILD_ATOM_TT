const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const { Grupo } = require("../models/grupos");

const grupoGet = async (req = request, res = response) => {
  const grupos = await Grupo.findAll();

  res.status(201).json({ grupos });
};

const grupoGets = async (req = request, res = response) => {
  const { id } = req.params;

  const grupo = await Grupo.findByPk(id);

  if (grupo) res.status(201).json({ grupo });
  else res.status(401).json({ msg: `No existe un grupo con el id ${id}` });
};

const grupoPost = async (req = request, res = response) => {
  const { body } = req;

  try {
    const grupo = await Grupo.build(body);

    await grupo.save();

    res.status(201).json({ grupo });
  } catch (err) {}
};

const grupoPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const grupo = await Grupo.findByPk(id);
    if (!grupo)
      res.status(404).json({ msg: `No existe un grupo con el id ${id}` });

    await grupo.update(body);
    // await grupo.save();

    res.status(200).json(grupo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};

const grupoDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const grupo = await Grupo.findByPk(id);

  if (!grupo)
    res.status(404).json({ msg: `No existe un grupo con el id ${id}` });

  await grupo?.update({ estado: false });

  res.json({ grupo });
};

module.exports = {
  grupoGet,
  grupoGets,
  grupoPost,
  grupoPut,
  grupoDelete,
};
