const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const { Calificacion } = require("../models/calificaciones");

const calificacionesGet = async (req = request, res = response) => {
  const calificaciones = await Calificacion.findAll();

  res.status(201).json({ calificaciones });
};

const calificacionGet = async (req = request, res = response) => {
  const { id } = req.params;

  const calificacion = await Calificacion.findByPk(id);

  if (calificacion) res.json({ calificacion });
  else
    res.status(401).json({ msg: `No existe un calificacion con el id ${id}` });
};

const calificacionPost = async (req = request, res = response) => {
  const { body } = req;
  console.log(body);

  try {
    const calificacion = await Calificacion.build(body);

    await calificacion.save();

    res.status(201).json({ calificacion });
  } catch (err) {}
};

const calificacionPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;

  console.log(body);

  try {
    const calificacion = await Calificacion.findByPk(id);
    if (!calificacion)
      res
        .status(404)
        .json({ msg: `No existe una calificacion con el id ${id}` });

    await calificacion.update(body);
    // await calificacion.save();

    res.status(200).json(calificacion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};

const calificacionDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const calificacion = await Calificacion.findByPk(id);
  if (!calificacion)
    res.status(404).json({ msg: `No existe un calificacion con el id ${id}` });

  await calificacion?.destroy();
  // await calificacion?.update({ estado: false });

  res.json({ calificacion });
};

module.exports = {
  calificacionesGet,
  calificacionGet,
  calificacionPost,
  calificacionPut,
  calificacionDelete,
};
