const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const { Comentario } = require("../models/comentarios");

const comentariosGet = async (req = request, res = response) => {
  const comentarios = await Comentario.findAll();

  res.status(201).json({ comentarios });
};

const comentarioGet = async (req = request, res = response) => {
  const { id } = req.params;

  const comentario = await Comentario.findByPk(id);

  if (comentario) res.json({ comentario });
  else res.status(401).json({ msg: `No existe un comentario con el id ${id}` });
};

const comentarioPost = async (req = request, res = response) => {
  const { body } = req;
  console.log(body);

  try {
    const comentario = await Comentario.build(body);

    await comentario.save();

    res.status(201).json({ comentario });
  } catch (err) {}
};

const comentarioPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;

  console.log(body);

  try {
    const comentario = await Comentario.findByPk(id);
    if (!comentario)
      res.status(404).json({ msg: `No existe un comentario con el id ${id}` });

    await comentario.update(body);
    // await comentario.save();

    res.status(200).json(comentario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};

const comentarioDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const comentario = await Comentario.findByPk(id);
  if (!comentario)
    res.status(404).json({ msg: `No existe un comentario con el id ${id}` });

  await comentario?.destroy();

  res.json({ comentario });
};

module.exports = {
  comentariosGet,
  comentarioGet,
  comentarioPost,
  comentarioPut,
  comentarioDelete,
};
