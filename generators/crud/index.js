"use strict";
const Generator = require("yeoman-generator");
const path = require("path");
const fs = require("fs");
const rp = require("request-promise");
const ejs = require("ejs");

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
        name: "isPaginated",
        message: "¿El servicio devuelve items paginados?",
        default: true
      },
      {
        type: "input",
        name: "itemsName",
        message: "Ingrese el nombre del atributo json que contiene los items",
        default: "items",
        when: function(answers) {
          return answers.isPaginated;
        }
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
      meta = require(path.join(
        process.cwd(),
        `${this.props.serviceName}.meta.json`
      ));

    let thekeys;

    if (this.props.isPaginated) {
      thekeys = Object.keys(thejson[this.props.itemsName][0]);
    } else {
      thekeys = Array.isArray(thejson)
        ? Object.keys(thejson[0])
        : Object.keys(thejson);
    }

    let templateData = {
      serviceName: this.props.serviceName,
      isPaginated: this.props.isPaginated,
      itemsName: this.props.itemsName,
      serviceNameTitleCase: changeCase.titleCase(this.props.serviceName),
      serviceNamePascalCase: changeCase.pascalCase(this.props.serviceName),
      thejson: thejson,
      meta: meta,
      changeCase: changeCase,
      thekeys: thekeys
    };

    this.fs.copy(`${this.templatePath()}/src`, `${this.destinationPath()}/src`);

    this.fs.copyTpl(
      this.templatePath("View.vue.ejs"),
      this.destinationPath(
        "src/views/" + changeCase.pascalCase(this.props.serviceName) + ".vue"
      ),
      templateData
    );

    if (this.fs.exists(this.destinationPath("src/router.js"))) {
      var routerJs = this.fs.read(this.destinationPath("src/router.js"));
      let imports = this.fs.read(this.templatePath("imports_router.ejs"));
      let jsonRoute = this.fs.read(this.templatePath("json_route_router.ejs"));

      let routerindex = routerJs.indexOf("routes: [");

      if (routerindex === -1) {
        throw new Error("No router definition found in router.js");
      }

      let routerJsBefore = routerJs.substring(0, routerindex + 9);
      let routerJsAfter = routerJs.substring(routerindex + 10);

      this.fs.write(
        this.destinationPath("src/router.js"),
        ejs.render(
          imports + routerJsBefore + jsonRoute + routerJsAfter,
          templateData
        )
      );
    }

    if (this.fs.exists(this.destinationPath("src/components/Navbar.vue"))) {
      var navbar = this.fs.read(
        this.destinationPath("src/components/Navbar.vue")
      );
      let addMenuNavBar = this.fs.read(
        this.templatePath("add_menu_navbar.ejs")
      );

      let insertIndex = navbar.indexOf("| Inicio");

      let before = navbar.substring(0, insertIndex + 8);
      let after = navbar.substring(insertIndex + 9);

      this.fs.write(
        this.destinationPath("src/components/Navbar.vue"),
        ejs.render(before + addMenuNavBar + after, templateData)
      );
    }
  }
};
