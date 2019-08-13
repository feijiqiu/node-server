#### express()
Creates an Express application. The express() function is a top-level function exported by the express module.
#### 1. http.createServer(app).listen()与 app.listen() 写法 区别
    
``` 来自源码注解 
    /**
     * Listen for connections.
     *
     * A node `http.Server` is returned, with this
     * application (which is a `Function`) as its
     * callback. If you wish to create both an HTTP
     * and HTTPS server you may do so with the "http"
     * and "https" modules as shown here:
     *
     *    var http = require('http')
     *      , https = require('https')
     *      , express = require('express')
     *      , app = express();
     *
     *    http.createServer(app).listen(80);
     *    https.createServer({ ... }, app).listen(443);
     *
     * @return {http.Server}
     * @public
     */
    
    app.listen = function listen() {
      var server = http.createServer(this);
      return server.listen.apply(server, arguments);
    };
```
#### 2. 中间件 分类

    按照其本质，middleware可以分为三类：
    1. application-level middleware（应用级别中间件），常见的接受三个参数的方法（(req, res, next) => {...}）；
    2. router-level middleware（分路级别中间件），是一个express.Router对象。
    3. error-handling middleware（处理错误中间件），接受四个参数（(req, res, next, error)）；
