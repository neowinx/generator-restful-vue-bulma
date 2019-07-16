"use strict";
const Generator = require("yeoman-generator");
const path = require("path");
const fs = require("fs");
const rp = require("request-promise");

const changeCase = require("change-case");

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: "input",
        name: "jsonUrl",
        message:
          "Ingrese la url del servicio RESTful a construir las vistas crud",
        default: "http://localhost:5000/user"
      },
      {
        type: "confirm",
        name: "authRequired",
        message:
          "El servicio requiere cabecera de autencicación (JWT, Basic, etc.)",
        default: true
      },
      {
        type: "input",
        name: "authHeader",
        message: "Ingrese la cabecera de autorización del servicio",
        default: "Bearer [access_token]"
      },
      {
        type: "input",
        name: "serviceName",
        message:
          "Ingrese el nombre del servicio (basado en el mismo se generaran los nombres de las vistas)",
        default: "user"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  async writing() {
    let thejson;
    if (this.props.authRequired) {
      thejson = await rp(this.props.jsonUrl, {
        headers: {
          Authorization: this.props.authHeader
        },
        json: true
      });
    } else {
      thejson = await rp(this.props.jsonUrl, {
        json: true
      });
    }
    let meta;
    if (fs.existsSync(`${this.props.serviceName}.meta.json`))
      meta = require(`${this.props.serviceName}.meta.json`);
    let thekeys = Array.isArray(thejson)
      ? Object.keys(thejson[0])
      : Object.keys(thejson);

    this.fs.copyTpl(
      this.templatePath("View.vue"),
      this.destinationPath(
        "src/views/" + changeCase.titleCase(this.props.serviceName) + ".vue"
      ),
      {
        serviceName: this.props.serviceName,
        thejson: thejson,
        meta: meta,
        changeCase: changeCase,
        thekeys: thekeys
      }
    );
  }
};
