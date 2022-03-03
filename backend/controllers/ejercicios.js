const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const { Ejercicio } = require("../models/ejercicios");

const ejerciciosGet = async (req = request, res = response) => {
  const ejercicios = await Ejercicio.findAll();

  res.status(201).json({ ejercicios });
};

const ejercicioGet = async (req = request, res = response) => {
  const { id } = req.params;

  const ejercicio = await Ejercicio.findByPk(id);

  if (ejercicio) res.json({ ejercicio });
  else res.status(401).json({ msg: `No existe un ejercicio con el id ${id}` });
};

const ejercicioPost = async (req = request, res = response) => {
  const { body } = req;
  console.log(body);

  try {
    const ejercicio = await Ejercicio.build(body);

    await ejercicio.save();

    res.status(201).json({ ejercicio });
  } catch (err) {}
};

const ejercicioPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;

  console.log(body);

  try {
    const ejercicio = await Ejercicio.findByPk(id);
    if (!ejercicio)
      res.status(404).json({ msg: `No existe un ejercicio con el id ${id}` });

    await ejercicio.update(body);
    // await ejercicio.save();

    res.status(200).json(ejercicio);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};

const ejercicioDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const ejercicio = await Ejercicio.findByPk(id);
  if (!ejercicio)
    res.status(404).json({ msg: `No existe un ejercicio con el id ${id}` });

  await ejercicio?.destroy();
  // await ejercicio?.update({ estado: false });

  res.json({ ejercicio });
};

module.exports = {
  ejerciciosGet,
  ejercicioGet,
  ejercicioPost,
  ejercicioPut,
  ejercicioDelete,
};
