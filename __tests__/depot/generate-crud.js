const { spawn } = require("child_process");
const rp = require("request-promise");
const fs = require("fs");
const path = require("path");

let arguments = process.argv.slice(2);

if (arguments.length < 1) {
  console.log('Usage: node generate-crud.json {service} [backendHost]');
  process.exit(1);
}

const serviceName = arguments[0];
const backendHost = arguments[1] ? arguments[1] : 'http://localhost:5000';

// Always replace the user.meta.json
const metaJsonName = `${serviceName}.meta.json`;
const jsonMetaPath = path.join(__dirname, metaJsonName);
if(fs.existsSync(jsonMetaPath)) {
  fs.copyFileSync(jsonMetaPath, path.join(process.cwd(), metaJsonName));
}

const ls = spawn("yo", ["restful-vue-bulma:crud"]);

var currentDialog = 0;

const script = [
  { on: "Ingrese la url del servicio RESTful a construir las vistas crud",
    say: `${backendHost}/${serviceName}\n` },
  { on: "¿El servicio devuelve items paginados?",
    say: "\n" },
  { on: "Ingrese el nombre del atributo json que contiene los items",
    say: "\n" },
  { on: "El servicio requiere cabecera de autencicación (JWT, Basic, etc.)",
    say: "\n" },
  { on: "Ingrese la cabecera de autorización del servicio",
    sayResultOf: async function() {
      let response = await rp({
        method: "POST",
        uri: `${backendHost}/login`,
        body: {
          username: "test",
          password: "test"
        },
        json: true
      });
      return `Bearer ${response.access_token}\n`;
    } },
  { on: "Ingrese el nombre del servicio",
    say: `${serviceName}\n` },
  { on: "Overwrite ",
    say: "a\n" },
];

// STDOUT events
ls.stdout.on("data", async data => {
  if(script[currentDialog]) {
    let d = script[currentDialog];
    if (data.indexOf(d.on) > 0) {
      console.log(d.on);
      if(d.sayResultOf)
        ls.stdin.write(await d.sayResultOf());
      if(d.say)
        ls.stdin.write(d.say);
      currentDialog++;
    }
  }

  if (currentDialog === script.length) {
    console.log('ending dialog...');
    ls.stdin.end();
  }
});

ls.stdout.on("error", error => {
  console.log(`stdout error: ${error}`);
});

// STDERR events
ls.stderr.on("data", data => {
  console.log(`stderr: ${data}`);
});

ls.stderr.on("error", error => {
  console.log(`stderr error: ${error}`);
});
