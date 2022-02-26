const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const { Laboratorio } = require("../models/laboratorios");

const laboratoriosGet = async (req = request, res = response) => {
  const laboratorios = await Laboratorio.findAll();

  res.status(201).json({ laboratorios });
};

const laboratorioGet = async (req = request, res = response) => {
  const { id } = req.params;

  const laboratorio = await Laboratorio.findByPk(id);

  if (laboratorio) res.json({ laboratorio });
  else
    res.status(401).json({ msg: `No existe un laboratorio con el id ${id}` });
};

const laboratorioPost = async (req = request, res = response) => {
  const { body } = req;
  console.log(body);

  try {
    const laboratorio = await Laboratorio.build(body);

    await laboratorio.save();

    res.status(201).json({ laboratorio });
  } catch (err) {}
};

const laboratorioPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;

  console.log(body);

  try {
    const laboratorio = await Laboratorio.findByPk(id);
    if (!laboratorio)
      res.status(404).json({ msg: `No existe un laboratorio con el id ${id}` });

    await laboratorio.update(body);
    // await laboratorio.save();

    res.status(200).json(laboratorio);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};

const laboratorioDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const laboratorio = await Laboratorio.findByPk(id);
  if (!laboratorio)
    res.status(404).json({ msg: `No existe un laboratorio con el id ${id}` });

  await laboratorio?.destroy();
  // await laboratorio?.update({ estado: false });

  res.json({ laboratorio });
};

module.exports = {
  laboratoriosGet,
  laboratorioGet,
  laboratorioPost,
  laboratorioPut,
  laboratorioDelete,
};
