const compress = require("./compress");
const config = require("../config.js");
const promisify = require("util").promisify;
const fs = require("fs");
const state = promisify(fs.stat);
const readDir = promisify(fs.readdir);
const path = require("path");

module.exports = async function (req, res, url) {
  try {
    const ObjState = await state(url);
    if( ObjState.isFile() ) {
      let rs = fs.createReadStream(url)
      if( url.match(config.compress) ) {
        rs = compress(rs, req, res);
      }
      return rs.pipe(res);
    } else if ( ObjState.isDirectory() ) {
      const directory = await readDir(url);
      const pathTree = url.slice(url.indexOf('public/')+7);
      let content = ''

      directory.forEach(name=> {
        content += `<p><a href='${config.host}:${config.port}/${pathTree}/${name}'>${name}</a><p>`;
      })

      if(pathTree) content += '<p><a href="#" onClick="window.history.back()">返回</a><p>';

      res.setHeader('Content-Type', 'text/html;charset=utf-8');
      return res.end(content);
    }
  }
  catch (ex) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain;charset=utf-8");
    res.end("文件不存在！");
    console.log(ex);
  }

}
