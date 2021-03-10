const concurrently = require("concurrently");
const copyfiles = require("copyfiles");

function run() {
  copyfiles(["packages/loader/dist/*.js", "examples/vanilla-js/js"], { up: true, error: true }, () => {
    concurrently([
      "lerna run --scope components-library start --stream",
      "npx wait-on http://localhost:8080 && http-server examples/vanilla-js -o -p 5000",
    ]);
  });
}

run();
