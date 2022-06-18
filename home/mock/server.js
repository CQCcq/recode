const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const querystring = require("querystring");
const middlewares = jsonServer.defaults();
var util = require("util");

server.use(middlewares);
server.post("/api/Parameters", (req, res) => {
  var post = "";
  req.on("data", function (chunk) {
    post += chunk;
  });

  req.on("end", function () {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    const data = JSON.parse(post);
    let result = {};
    if (
      data &&
      !isNaN(Number(data.wavetype)) &&
      !isNaN(Number(data.frequency)) &&
      !isNaN(Number(data.strength))
    ) {
      result = {
        success: true,
        code: 200,
        message: "操作成功",
        result: {},
      };
    } else {
      result = {
        success: false,
        code: 400,
        message: "参数校验失败",
        result: {},
      };
    }
    res.end(JSON.stringify(result));
  });
});
// /api/Start
server.post("/api/Start", (req, res) => {
  var post = "";
  req.on("data", function (chunk) {
    post += chunk;
  });

  req.on("end", function () {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    const data = JSON.parse(post);
    let result = {};
    if (data && !isNaN(Number(data.type))) {
      result = {
        success: true,
        code: 200,
        message: "操作成功",
        result: {},
      };
    } else {
      result = {
        success: false,
        code: 400,
        message: "参数校验失败",
        result: {},
      };
    }
    res.end(JSON.stringify(result));
  });
});
server.use(router);
server.listen(9000, () => {
  console.log("JSON Server is running");
});
