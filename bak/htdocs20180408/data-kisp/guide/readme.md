
KISP 框架
==============================================================

###简介 

> KISP 是一个轻量级的 JavaScript 框架，采用 CMD 模式进行模块化的封装，
提供了一些模块和接口，*可以用于 Web 和轻应用的开发*。

###杂记 Todo

- 能否通过自动化工具分析模块代码，公共模块给哪些私有模块引用了？


- [微销售后台文档](?config=data/index.json&item=0.0)
- [ES6 教程](?config=data/es6.json&item=0.0)

###专题介绍
- [JavaScript 开发规范](?file=./specification/js/index.md)


- [JSON 源文件](?file=./index.json)
- [JS 源文件](?file=lib/ParallelTasks.js)
- [KISP.js 源文件](?file=f/kisp/kisp.debug.js)
- [KISP.css 源文件](?file=f/kisp/kisp.debug.css)
- [CSS 源文件](?file=style/css/modules.main.panel.css)
- [ES6 教程](?file=./es6/readme.md)
- [ES6 教程全部](?file=./es6/docs/array.md,./es6/docs/arraybuffer.md,./es6/docs/async.md)
- [ES6 教程全部](?dir=./es6/docs/&file=array,arraybuffer,async,class,decorator)

``` javascript

//不推荐
function fn() {
        
    var count = 10,
        name = "Nicholas",
        found = false,
        map = {},
        list = [],
        get = function () {
            //...
            //这个函数可能很长很长
        },
        //...
        //这里可能还会有很多个变量，占据很多行
        empty;
        
    //do something...

}

```


### 更新记录

####v3.0.7

2015-12-07
- 给模块 `SSH.API`、`SSH`、`SSH/Server`、`SSH/Ajax` 加上可选配置字段 `netid`。
- 去掉模块 `SSH/Server` 的默认 `config` 对象，因为它不可能为空。
- 完善模块 `SSH.API`、`SSH`、`API` 的默认配置的注释和增加相应的字段。
- 优化模块　`SSH.API` 的 `post` 方法。

2015-12-04
- 把默认配置的定义由 `defaults.ABC` 修改成 `ABC.defaults` 的形式，让它在 jsdoc 文档中直接成为 `ABC` 的一个属性。
- 修改模块 `Defaults` 的加载，由 `defaults.ABC` 修改成 `ABC.defaults` 的形式。
- 完善默认配置的字段注释。

2015-12-03
- 把 KISP 内部模块用到的默认配置 `defaults` 拆分成单个独立的子配置，方便维护和管理。
- 把模块 `SSH` 设置成私有模块，因为外部不会直接用到它，而是使用模块 `SSH.API` 比较常见。
- 修改了模块 `Config` 的静态方法。
- 增加了模块 `Defaults`，针对 KISP 内部模块使用的默认配置管理器。

####v3.0.6

2015-12-01
- 优化模块 `SSH/Server/Config` 的 `get` 方法，当不传入回调函数时也可以发起调用。
- 把模块 `Proxy` 对 Url 的解析单独成一个子模块 `Proxy/Url`。
- 给模块 `Proxy` 增加配置字段 `base`，以指定起始的代理目录。当 `API` 中的 `proxy` 以 `/` 开头，则不使用 `base` 所指定的目录。 
- 给模块 `API` 和 `SSH.API` 的 `proxy` 字段增加 `proxy: true` 的支持。此时等价于 `proxy: '{ApiName}.js'`。 
- 修复了模块 `SSH.API` 中 `proxy` 字段失效的问题。
- 修复模块 `Dialog` 设置了 `text` 和 `height` 后无法向下滚动的问题。


2015-11-30
- 把模块 `Proxy` 对 `Seajs` 的依赖去掉，用回自己实现的来动态加载 js 文件。
- 把模块 `Seajs` 从 KISP 中移除掉，因为它之前一直都是私有模块。
- 优化模块 `SSH/Server/Config` 的 `get` 方法，当不传入回调函数时也可以发起调用。

####v3.0.5

2015-11-30
- 去掉了模块 `API` 中不常用的几种事件绑定方法：`done`、`success`、`fail`、`error`、`status`、`code`，可以改为 on() 实现。
- 把模块 `Proxy` 设置为私有模块，因为外部不需要直接用到它。
- 优化模块 `Proxy` 中的 `request` 的 JsDoc 注释。
- 去掉了模块 `Proxy` 中的 `response` 对 action 的响应模块。只保留更通用的 `response(json)` 和 `response(fn)` 两种。
- 补充完整模块 `Seajs` 中的 `use` 方法的参数，对实际使用无影响，仅为了代码更可读。


2015-11-27
- 优化 `Scroller` 模块的 `pulldown` 和 `pullup` 方法。

2015-11-24
- 给 `Mask` 增加了 `$` 快捷字段，以访问对应的工DOM 节点的 jQuery 包装对象。
- 给视图切换动画增加了 mask 层，会随着视图的切换动画而进行 opacity 的变化。


####v3.0.4
2015-11-24
- 修改模块的 css 类名为大写开头，避免无意中被业务层影响。 涉及的模块有: `NoData`、`Alert`、`Toast`、`App`、`View`。
- 给模块 `SSH/Server/Config` 增加了配置字段 `host`，可以指定为 ip，以应对 `http://kd.cmcloud.cn` 域名无法解析的问题。


####v3.0.3
2015-11-23
- 修复模块 `Loading` 配置中的 `append` 字段无效的问题。
- 删除了模块 `Loading` 中的 `spinner` 模板，该模板目前没有用到。
- 把模块 `Loading` 的 css 类名改成大写开头，避免跟业务层冲突，同时兼容旧的名称 `same-line`，建议使用新的 `SameLine`。
- 优化模块 `Loading` 的 css 类名，改写成更简短的方式。
- 修复模块 `Loading` 中的 Mask 层的 `container` 指向问题，让它与 `Loading` 的一致。

2015-11-20
- 优化模块方法 `Mask.remove()`。
- 优化模块方法 `Dialog.remove()`。
- 优化模块方法 `Dialog/Style.get()`。
- 增加模块方法 `Dialog.render()`。
- 优化模块 `Alert` 的实现，支持多次调用并依次显示出 alert 对话框（之前的只能显示最后一次的 alert 调用）。
- 把子模块的调用方式由 `require(module, 'ABC')` 改成 `module.require('ABC')`;
- 给模块 `SSH.API` 增加了默认错误消息: `网络繁忙，请稍候再试`，当 http 协议请求错误时将使用该消息。
- 模块 `View` 的背景色需要在配置中指定，否则不会生成背景色。 


####v3.0.2
2015-11-19

- 修复了视图动画后退时没有触发 `show` 事件的 bug。
- 修复了视图前进时动画有时不起作用的 bug（通过增加延迟的方式）。

2015-11-17 

- 增加了视图切换（前进和后退）时使用动画效果。 同时兼容原有的无动画方式。 


####v3.0.1

2015-11-12 
- 增加了 UI 组件：图片查看器 `ImageViewer`。
- 修复了 `Scroller` 组件中当禁用滚动条时的 bug，此时　`scroller.indicators` 为 `undefined`。



2015-11-10 
- 增加了 UI 组件：确认对话框 `Confirm`，并提供了快捷方式: `KISP.confirm(text, fn)`。


2015-11-05 
- 增加了模块 `LocalStorage`。
- 增加了模块 `SessionStorage`。














