"use strict";
const utils = require('../utils');
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
      },
      {
        type: "input",
        name: "metaJsonPath",
        message:
          "Ingrese la ubicación del archivo de configuración opcional (ej. generator/user.meta.json)"
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
    if(!this.props.metaJsonPath){
      this.props.metaJsonPath = `${this.props.serviceName}.meta.json`;
    }
    if (fs.existsSync(this.props.metaJsonPath)){
      if(path.isAbsolute(this.props.metaJsonPath)){
        meta = require(this.props.metaJsonPath);
      }else{
        meta = require(path.join(process.cwd(),this.props.metaJsonPath));
      }
    }
      
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

    let dis = this;

    function modifyDestFile(filename, withThis) {
      if (dis.fs.exists(dis.destinationPath(filename))) {
        var fileString = dis.fs.read(dis.destinationPath(filename));
        let newFileString = withThis(fileString);
        if (newFileString) {
          dis.fs.write(dis.destinationPath(filename), newFileString);
        }
      }
    }

    modifyDestFile("src/router.js", (routerJs) => {
      let imports = this.fs.read(this.templatePath("imports_router.ejs"));
      let jsonRoute = this.fs.read(this.templatePath("json_route_router.ejs"));

      let routerindex = routerJs.indexOf("routes: [");

      if (routerindex === -1) {
        throw new Error("No router definition found in router.js");
      }

      let routerJsBefore = routerJs.substring(0, routerindex + 9);
      let routerJsAfter = routerJs.substring(routerindex + 10);

      return ejs.render(
        imports + routerJsBefore + jsonRoute + routerJsAfter,
        templateData
      );
    });

    modifyDestFile("src/components/Navbar.vue", navbar => {
      let addMenuNavBar = this.fs.read(
        this.templatePath("add_menu_navbar.ejs")
      );

      let insertIndex = navbar.indexOf("| Inicio");

      let before = navbar.substring(0, insertIndex + 8);
      let after = navbar.substring(insertIndex + 9);

      return ejs.render(before + addMenuNavBar + after, templateData);
    });

    modifyDestFile("src/main.js", mainJs => {
      var newMainJs = mainJs;
      
      function addToMainJs(after, what, ifnot) {
        if (newMainJs.indexOf(ifnot ? ifnot : what) === -1) {
          newMainJs = utils.insertAfter(newMainJs, after, what);
        }
      }
      
      addToMainJs("import router from './router'",
         "\nimport { library } from '@fortawesome/fontawesome-svg-core'\n" +
         "import { faFileUpload, faUserSecret, faKey, faTasks, faSearch, faEdit, faPrint } from '@fortawesome/free-solid-svg-icons'\n" +
         "import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'",
         "from '@fortawesome/fontawesome-svg-core'");

      addToMainJs("import router from './router'",
         "\n\nimport VCalendar from 'v-calendar'");
      
      addToMainJs("Vue.config.productionTip = false",
         "\n\nVue.use(VCalendar)");

      addToMainJs("Vue.config.productionTip = false",
         "\n\nVue.component('font-awesome-icon', FontAwesomeIcon)");

      addToMainJs("Vue.config.productionTip = false",
         "\n\nlibrary.add(faFileUpload, faUserSecret, faKey, faTasks, faSearch, faEdit, faPrint)");

      return newMainJs;
    });

    modifyDestFile("package.json", packageJson => {
      var newPackageJson = packageJson;

      function addPackage(name, version) {
        if (newPackageJson.indexOf(`"${name}": `) === -1) {
          newPackageJson = utils.insertAfter(
            newPackageJson,
            '"vue-router": "^3.0.3"',
            `,\n    "${name}": "${version}"`
          );
          dis.options.packageJsonModified = true;
        }
      }

      addPackage("vue-multiselect", "2.1.6");
      addPackage("v-calendar", "^1.0.0-beta.16");
      addPackage("@fortawesome/fontawesome-svg-core", "^1.2.30");
      addPackage("@fortawesome/free-solid-svg-icons", "^5.14.0");
      addPackage("@fortawesome/vue-fontawesome", "^2.0.0");

      if (dis.options.packageJsonModified) {
        return newPackageJson;
      }
    }); 

  }

  install() {
    if (this.options["skip-install"]) {
      return;
    }

    if (this.options.packageJsonModified) {
      this.spawnCommand("npm", ["install"]);
    }
  }
};
