const path = require("path");
const fs = require("fs");

const { response, request } = require("express");
const nodemailer = require("nodemailer");
const { Alumno, Profesor } = require("../models");

const recoverPassword = async (req = request, res = response) => {
  const { body } = req;
  const { coleccion } = req.params;

  const email = body.email;

  console.log(email);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cs0424315@gmail.com",
      pass: ")PB~oHE93`5DP$gpLXba$vS,k/",
    },
  });

  if (coleccion === "alumnos") {
    const alumno = await Alumno.findOne({ where: { email } });
    if (alumno) {
      let mailOptions = {
        from: "cs0424315@gmail.com",
        to: email,
        subject: "Recover password",
        text: `
          Nombre: ${alumno.nombre}
          Institucion ${alumno.institucion}
          Email: ${alumno.email}
          Password: ${alumno.password}
          Grupo: ${alumno.idGrupo}
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(401).json({ email: "email no enviado" });
        } else {
          console.log("Email sent: " + info.response);
          res.status(201).json({ email: "email enviado alumno" });
        }
      });
    } else {
      res.status(401).json({ email: "email no enviado" });
    }
  } else {
    const profesor = await Profesor.findOne({ where: { email } });

    if (profesor) {
      let mailOptions = {
        from: "cs0424315@gmail.com",
        to: email,
        subject: "Recover password",
        text: `
        Nombre: ${profesor.nombre}
        Institucion ${profesor.institucion}
        Email: ${profesor.email}
        Password: ${profesor.password}
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(401).json({ email: "email no enviado" });
        } else {
          console.log("Email sent: " + info.response);
          res.status(201).json({ email: "email enviado profesor" });
        }
      });
    } else {
      res.status(401).json({ email: "email no enviado" });
    }
  }
};

module.exports = {
  recoverPassword,
};
