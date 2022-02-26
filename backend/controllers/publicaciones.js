const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const { Publicacion } = require("../models");

const publicacionGet = async (req = request, res = response) => {
  const { id } = req.params;

  const publicacion = await Publicacion.findByPk(id);

  if (publicacion) res.status(201).json({ publicacion });
  else
    res.status(401).json({ msg: `No existe una publicacion con el id ${id}` });
};

const publicacionesGet = async (req = request, res = response) => {
  const publicaciones = await Publicacion.findAll();

  res.status(201).json({ publicaciones });
};

const publicacionPost = async (req = request, res = response) => {
  const { body } = req;
  console.log(body);

  try {
    const publicacion = await Publicacion.build(body);

    await publicacion.save();

    res.status(201).json({ publicacion });
  } catch (err) {}
};

const publicacionPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion)
      res.status(404).json({ msg: `No existe un publicacion con el id ${id}` });

    await publicacion.update(body);
    // await publicacion.save();

    res.status(200).json(publicacion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};

const publicacionDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const publicacion = await Publicacion.findByPk(id);
  if (!publicacion)
    res.status(404).json({ msg: `No existe un publicacion con el id ${id}` });

  await publicacion?.destroy();
  // await publicacion..update({ estado: false });

  res.json({ publicacion });
};

module.exports = {
  publicacionGet,
  publicacionesGet,
  publicacionPost,
  publicacionPut,
  publicacionDelete,
};
