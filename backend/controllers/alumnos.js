const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const { Alumno } = require("../models");

const alumnoGet = async (req = request, res = response) => {
  const { id } = req.params;

  const alumno = await Alumno.findByPk(id);

  res.status(201).json({ alumno });
};

const alumnosGet = async (req = request, res = response) => {
  const alumnos = await Alumno.findAll();

  res.status(201).json({ alumnos });
};

const alumnoPost = async (req = request, res = response) => {
  const { body } = req;

  console.log(body);

  try {
    const existeEmail = await Alumno.findOne({
      where: { email: body.email },
    });

    if (existeEmail)
      return res
        .status(400)
        .json({ msg: `Ya existe un alumno con este email ${body.email}` });

    const alumno = await Alumno.build(body);

    await alumno.save();

    res.status(201).json({ alumno });
  } catch (err) {}
};

const alumnoPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;

  console.log(body);

  try {
    const alumnos = await Alumno.findByPk(id);
    if (!alumnos)
      res.status(404).json({ msg: `No existe un alumnos con el id ${id}` });

    await alumnos.update(body);
    // await alumnos.save();

    res.status(200).json(alumnos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};

const alumnoDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const alumno = await Alumno.findByPk(id);
  if (!alumno)
    res.status(404).json({ msg: `No existe un alumno con el id ${id}` });

  // await alumno?.destroy();
  await alumno?.update({ estado: false });

  res.json({ alumno });
};

module.exports = {
  alumnoGet,
  alumnosGet,
  alumnoPost,
  alumnoPut,
  alumnoDelete,
};
