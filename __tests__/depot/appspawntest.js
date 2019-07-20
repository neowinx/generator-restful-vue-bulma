const { spawn } = require("child_process");

const ls = spawn("yo", ["restful-vue-bulma"]);

var expectedAnswers = 0;

// STDOUT events
ls.stdout.on("data", data => {
  console.log(`stdout: ${data}`);
  if (data.indexOf("Enter the project name") > 0 && expectedAnswers === 0) {
    ls.stdin.write("\n");
    expectedAnswers++;
  }
  console.log(`expectedAnswers: ${expectedAnswers}`);
  if (expectedAnswers >= 1) {
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
