const express = require('express');
const http = require('http');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
const path = require("path");

const config = require("./config");

const app = express();



// 应用级别中间件添加

// 返回一个只解析json的中间件，可以支持任何unicode编码的消息体，同时也支持gzip和deflate编码。最后保存的数据都放在req.body对象上
app.use(bodyParser.json({limit:"4096kb" }));
// extended:如果设置为false，那么对URL-encoded的数据的解析采用querystring库，如果设置为true那么采用qs库。 extended符号允许富对象和数组被编码为URL-encoded的类型，也可以是一个JSON编码的数据。
app.use(bodyParser.urlencoded({ extended: false ,limit:"1024kb" }));
app.use(cookieParser());
// 图标设置
app.use(favicon(path.join(__dirname,"static",'favicon.png')));
// 静态目录设置
app.use(express.static(path.join(__dirname, "static")));

app.get('/test', (req, res) => res.send('Hello World!'));

app.get('/test-1', (req, res) => {
    console.log(req.query);
    res.send(JSON.stringify(req.query));
});


// app.listen(config.port, () => console.log(`Example app listening on port ${config.port} !`));

const server = http.createServer(app)
    .listen(config.port,() => console.log(`Example app listening on port ${config.port} !`));

server.on("error", e  => {
    console.log("Error starting server " + e);
});
server.on("listening", () => {
    console.log(`Starting server port ${config.port} successfully `);
});
