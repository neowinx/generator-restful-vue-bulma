const { spawn } = require("child_process");
const rp = require("request-promise");

const ls = spawn("yo", ["restful-vue-bulma:crud"]);

var expectedAnswers = 0;

// STDOUT events
ls.stdout.on("data", async data => {
  console.log(`stdout: ${data}`);
  if (
    data.indexOf(
      "Ingrese la url del servicio RESTful a construir las vistas crud"
    ) > 0 &&
    expectedAnswers === 0
  ) {
    ls.stdin.write("\n");
    expectedAnswers++;
  }
  if (
    data.indexOf(
      "El servicio requiere cabecera de autencicación (JWT, Basic, etc.)"
    ) > 0 &&
    expectedAnswers === 1
  ) {
    ls.stdin.write("\n");
    expectedAnswers++;
  }
  if (
    data.indexOf("Ingrese la cabecera de autorización del servicio") > 0 &&
    expectedAnswers === 2
  ) {
    let response = await rp({
      method: "POST",
      uri: "http://localhost:5000/login",
      body: {
        username: "test",
        password: "test"
      },
      json: true
    });
    ls.stdin.write(`Bearer ${response.access_token}\n`);
    expectedAnswers++;
  }
  if (
    data.indexOf("Ingrese el nombre del servicio") > 0 &&
    expectedAnswers === 3
  ) {
    ls.stdin.write("\n");
    expectedAnswers++;
  }
  if (
    data.indexOf("Overwrite src/router.js? (ynaxdH)") > 0 &&
    expectedAnswers === 4
  ) {
    ls.stdin.write("a\n");
    expectedAnswers++;
  }
  if (expectedAnswers >= 4) {
    ls.stdin.end();
  }
});

ls.stdout.on("error", error => {
  console.log(`stdout error: ${error}`);
});

ls.stdout.on("close", data => {
  console.log(`stdout close: ${data}`);
});

ls.stdout.on("end", data => {
  console.log(`stdout end: ${data}`);
});

// STDERR events
ls.stderr.on("data", data => {
  console.log(`stderr: ${data}`);
});

ls.stderr.on("error", error => {
  console.log(`stderr error: ${error}`);
});

ls.stderr.on("close", data => {
  console.log(`stderr close: ${data}`);
});

ls.stderr.on("end", data => {
  console.log(`stderr end: ${data}`);
});

// ChildProcess events
ls.on("close", code => {
  console.log(`child process closed with code ${code}`);
});

ls.on("exit", code => {
  console.log(`child process exited with code ${code}`);
});

ls.on("disconnect", code => {
  console.log(`child process disconnected with code ${code}`);
});
