#### 关于webpack，babel，以及es6和commonJS之间的联系（转）
>   原文: https://blog.csdn.net/a250758092/article/details/78543440

    在这里理清一下以上几个概念以及他们之间的关系。
    
    现在的浏览器很多都不支持es6的语法，或者仅仅是部分支持，比如你用.360浏览器，你会发现它支持let却不支持箭头函数等。
    
    babel就承担了“翻译”的角色，把es6的写法转换成es5的写法。 
    但是有些人可能在一个项目中单独安装完babel，并成功生成了新的文件后，发现导入这个文件到浏览器中却报错了。
    其中很有可能被误导的是 import这个关键词。
    
    实际上babel转换后的代码是遵循commonJS规范的，而这个规范，浏览器并不能识别。
    因此导入到浏览器中会报错，而nodeJS是commonJS的实现者，所以在babel转换后的代码是可以在node中运行的。
    
    为了将babel生成的commonJS规范的es5写法能够在浏览器上直接运行，我们就借住了webpack这个打包工具来完成，因为webpack本身也是遵循commonJS这个规范的，从它的配置文件webpack.config.js中就可以看出来
```$xslt
    //module.exports是commonJS的接口输出规范，es6的规范是export
    module.exports = {
      entry: path.join(__dirname, 'index.js'),
      output: {
          path: path.join(__dirname, 'outs'),
          filename: 'index.js'
      },
    };
```

> es6和commonJS的关系。

    在es6标准出来之前，大家都是commonJS或者AMD规范来模块化。
    而es6并没有沿用commonJS的东西，所以他们之间并没有什么必要的联系。
    在这里只谈es6和commonJS的 导入和输出的区别，其他深入的请自行了解
    
> 在commonJS中引入文件和输出接口分别为
```
    require('./a');//引入
    //对外接口
    module.exports={
        a:xxx,
        b:function(){}
    }
```
> 而es6的写法则是
```$xslt
    //引入
    import {a,b,c} from './a';
    
    //输出
    export {a,b,c}
```
> 所以总会有人把es6的export 和 commonJS的module.exports拿来做比较，他们是完全不同的东西。

    至于在网上看到的代码，有一些用export有一些用 module.exports 区别只是在于他们有没有用es6的规范来写，
    完整的流程是 es6->es5(commonJS规范)->浏览器可执行代码。 
    重点只在于他们是直接用es5写还是用es6写，用es6的话就多了一个转换的步骤
>
    那么我们应该如何利用webpack完成一整个步骤呢？
    即用es6写法直接生成浏览器可识别的代码，而不用单独用babel指令生成代码再转换。
    webpack为我们提供了一系列的方案。

> 
    首先我们创建一个空白项目,
    进入项目，并安装以下各个依赖
```
    -  npm install --save webpack
    -  npm install --save babel-loader
    -  npm install --save babel-core
    -  npm install --save babel-preset-es2015
```
自从babel升级6.x版本后就分成了两个插件，一个是babel-core【终端运行】，(如果是node请安装babel-cli )，一个是babel-preset-es2015

> 安装完上述内容之后，需要设置一个.babelrc的文件放在根目录下，内容为
```
    {
      "presets": ["es2015"]
    }
```
> 并且在webpack.config.js中配置babel-loader
```
    module.exports = {
        entry: "./js/main.js",
        output:{
            filename: 'bundle.js'
    
        },
        module: {
            loaders: [{
                test: /\.js$/,
                loader: "babel-loader"
    
            }]
    
        }
    }
```
配置完成后，就可以直接在JS文件中使用es6的语法，然后通过webpack命令打包生成，即可
