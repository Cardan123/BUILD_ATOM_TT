const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      profesor: "/api/profesores",
      alumno: "/api/alumnos",
      grupos: "/api/grupos",
      publicaciones: "/api/publicaciones",
      comentarios: "/api/comentarios",
      laboratorios: "/api/laboratorios",
      ejercicios: "/api/ejercicios",
      atomos: "/api/atomos",
      calificaciones: "/api/calificaciones",
      uploads: "/api/uploads",
      recover: "/recover",
    };

    //Conectar a base datos
    this.dbConnection();
    this.initialize();

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();
  }

  async dbConnection() {
    try {
      await dbConnection.authenticate();
      console.log("Database online");
    } catch (error) {
      throw new Error(error);
    }
  }

  async initialize() {
    // init models and add them to the exported db object
    const { Grupo } = require("../models/index");
    const { Profesor } = require("../models/index");
    const { Alumno } = require("../models/index");
    const { Publicacion } = require("../models/index");
    const { Comentario } = require("../models/index");
    const { Laboratorio } = require("../models/index");
    const { Ejercicio } = require("../models/index");
    const { Atomo } = require("../models/index");
    const { Calificacion } = require("../models/index");

    // sync all models with database
    await dbConnection.sync();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    //Directorios estaticos
    this.app.use(express.static("public"));

    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.profesor, require("../routes/profesores"));
    this.app.use(this.paths.alumno, require("../routes/alumno"));
    this.app.use(this.paths.grupos, require("../routes/grupos"));
    this.app.use(this.paths.publicaciones, require("../routes/publicaciones"));
    this.app.use(this.paths.comentarios, require("../routes/comentarios"));
    this.app.use(this.paths.laboratorios, require("../routes/laboratorios"));
    this.app.use(this.paths.ejercicios, require("../routes/ejercicios"));
    this.app.use(this.paths.atomos, require("../routes/atomos"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
    this.app.use(
      this.paths.calificaciones,
      require("../routes/calificaciones")
    );
    this.app.use(this.paths.recover, require("../routes/recover"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto: ${this.port}`);
    });
  }
}

module.exports = Server;
