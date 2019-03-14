/* eslint-disable no-console */
const http = require("http");
const chalk = require("chalk");
const config = require("./config");

// eslint-disable-next-line func-names
const server = http.createServer((req, res) => {

  res.end("hello");

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
