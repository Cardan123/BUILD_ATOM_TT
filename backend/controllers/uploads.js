const path = require("path");
const fs = require("fs");

const { response, request } = require("express");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require("../helpers/subir-archivos");

const { Publicacion, Comentario } = require("../models");

const archivosPost = async (req = request, res = response) => {
  // Imagenes
  try {
    // const nombre = await subirArchivo(req.files, ['txt','md'], 'texto');
    const nombre = await subirArchivo(req.files, undefined, "imgs");
    res.json({ nombre });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const archivosPut = async (req = request, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "publicaciones":
      modelo = await Publicacion.findByPk(id);
      if (!modelo)
        res
          .status(400)
          .json({ msg: `No existe una publicaciones con este id ${id}` });
      break;

    case "comentarios":
      modelo = await Comentario.findByPk(id);
      if (!modelo)
        res
          .status(400)
          .json({ msg: `No existe un comentarios con este id ${id}` });
      break;

    default:
      return res.status(500).json({ msgn: "Se me olvido esta opcion" });
  }

  // Limpiar imagen
  if (modelo.archivos) {
    const nombreArr = modelo.archivos.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    await cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  modelo.archivos = secure_url;

  await modelo.save();

  res.json(modelo);
};

const archivosGet = async (req = request, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "publicaciones":
      modelo = await Publicacion.findByPk(id);
      if (!modelo)
        res
          .status(400)
          .json({ msg: `No existe una publicaciones con este id ${id}` });
      break;

    case "comentarios":
      modelo = await Comentario.findByPk(id);
      if (!modelo)
        res
          .status(400)
          .json({ msg: `No existe un comentarios con este id ${id}` });
      break;

    default:
      return res.status(500).json({ msgn: "Se me olvido esta opcion" });
  }

  // Limpiar imagen
  if (modelo.archivos != "null") {
    // Hay que borrar la imagen del servidor
    const imagen = modelo.archivos;
    return res.json({ imagen });
  }

  const pathImagen = path.join(__dirname, "../assets/no-image.jpg");
  return res.sendFile(pathImagen);
};

const archivosDelete = async (req = request, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "publicaciones":
      modelo = await Publicacion.findByPk(id);
      if (!modelo)
        res
          .status(400)
          .json({ msg: `No existe una publicaciones con este id ${id}` });
      break;

    case "comentarios":
      modelo = await Comentario.findByPk(id);
      if (!modelo)
        res
          .status(400)
          .json({ msg: `No existe un comentarios con este id ${id}` });
      break;

    default:
      return res.status(500).json({ msgn: "Se me olvido esta opcion" });
  }

  // Limpiar imagen
  if (modelo.archivos != "null") {
    const nombreArr = modelo.archivos.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    await cloudinary.uploader.destroy(public_id);

    modelo.archivos = "null";
    await modelo.save();
    return res.status(201).json({ msg: "Imagen eliminada" });
  }

  const pathImagen = path.join(__dirname, "../assets/no-image.jpg");
  return res.sendFile(pathImagen);
};

module.exports = {
  archivosPost,
  archivosPut,
  archivosGet,
  archivosDelete,
};
