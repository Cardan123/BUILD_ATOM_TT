const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const { Atomo } = require("../models/atomos");

const atomosGet = async (req = request, res = response) => {
  const atomos = await Atomo.findAll();

  res.status(201).json({ atomos });
};

const atomoGet = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;

  const atomo = await Atomo.findByPk(id);

  if (atomo) res.json({ atomo });
  else res.status(401).json({ msg: `No existe un atomo con el id ${id}` });
};

const atomoPost = async (req = request, res = response) => {
  const { body } = req;
  console.log(body);

  try {
    const atomo = await Atomo.build(body);

    await atomo.save();

    res.status(201).json({ atomo });
  } catch (err) {}
};

const atomoPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;

  console.log(body);

  try {
    const atomo = await Atomo.findByPk(id);
    if (!atomo)
      res.status(404).json({ msg: `No existe un atomo con el id ${id}` });

    await atomo.update(body);
    // await atomo.save();

    res.status(200).json(atomo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};

const atomoDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const atomo = await Atomo.findByPk(id);
  if (!atomo)
    res.status(404).json({ msg: `No existe un atomo con el id ${id}` });

  await atomo?.destroy();
  // await atomo?.update({ estado: false });

  res.json({ atomo });
};

module.exports = {
  atomosGet,
  atomoGet,
  atomoPost,
  atomoPut,
  atomoDelete,
};
