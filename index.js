/* eslint-disable max-len */
/* eslint-disable no-console */
const http = require("http");
const chalk = require("chalk");
const path = require("path");
const config = require("./config");
const getFile = require("./lib/getFile");

// eslint-disable-next-line func-names
const server = http.createServer((req, res) => {

  const urlObj = path.parse(req.url);
  const resoucePath = path.join(config.root, `${urlObj.dir.slice("1")}/${urlObj.name}${urlObj.ext}`);

  getFile(req, res, resoucePath);

});

server.listen(config.port, (err) => {

  if (err) {

    console.log(err);

  } else {

    const chalkCtx = chalk.red.underline(`${config.host}:${config.port}`);
    const content = `Anydoor create successful, The Server at ${chalkCtx}`;

    console.info(content);

  }


});
