#### node 的 module 遵循 CommonJS 规范，是commonJS的实现者
node 不支持 export/import 关键字
9.+  兼容官方文档： http://nodejs.cn/api/esm.html#esm_differences_between_es_modules_and_commonjs
### node 对于 ES6 版本兼容问题
主要不兼容 常用的 export/import 关键字
```
    // export default xxx;
    module.exports = xxxx; 
    // import xxx from "relative path"
    const xxxx = require('relative path'); 
```
```  ES 版本兼容查询
    // 全局安装
    npm install es-checker -g
    // 安装后，在命令行中执行
    es-checker
```

