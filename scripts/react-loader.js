const concurrently = require("concurrently");
const copyfiles = require("copyfiles");

function run() {
  copyfiles(["packages/loader/dist/*.js", "examples/react-vanila-loader/public/js"], { up: true, error: true }, () => {
    concurrently([
      "lerna run --scope components-library start --stream",
      "npx wait-on http://localhost:8080 && lerna run --scope react-vanila-loader start",
    ]);
  });
}

run();
