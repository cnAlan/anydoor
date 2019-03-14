const {createDeflate, createGzip} = require("zlib");

module.exports = (rs, req, res) => {

  const acceptEncoding = req.headers["accept-encoding"];

  if (acceptEncoding.match(/\bgzip\b/u)) {

    res.setHeader("Content-Encoding", "gzip");

    return rs.pipe(createGzip());

  } else if (acceptEncoding.match(/\bdefalte\b/u)) {

    res.setHeader("Content-Encoding", "deflate");

    return rs.pipe(createDeflate());

  }

  return rs;

};
