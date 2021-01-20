

#引入 less 文件

>less 是一种增强版的 css 语言，作为一种 css 扩展, 它不仅向后兼容 css, 它还使用现有的 css 语法新增了额外的特性。 这使得学习 less 更轻松, 一旦有任何问题，可以随时退回使用标准的 css.
本质上，less 包含一套自定义的语法及一个解析器，用户根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的 css 文件。
less 并没有裁剪 css 原有的特性，更不是用来取代 css 的，而是在现有 css 语法的基础上，为 css 加入程序式语言的特性，是一个增强版的 css。


支持 w3c 标准的浏览器原生不支持 less 文件的直接引用，要在页面使用 less 文件，
必须通过某种工具把 less 文件编译成对应的 css 文件，然后通过 `<link>` 标签引用该 css 文件。

##工作原理

作为讨论，这里简单展示一下 `auto-weber` 是如何处理 less 文件的引入的。
以母版页为输入源，找到所有引入的 less 文件，编译生成对应的 css 文件，根据 css 的文件路径生成相应的 `<link>` 标签，编译生成浏览器可识别的、可运行的页面。

![](data/weber/img/less-flow.png)


> 要引入 less 文件，有 静态引入 和 动态引入 两种方式。  
静态引入是基础的、标准的单个引入方式，适用于具体某个 less 文件的引入。  
动态引入是扩展的、批量的引入方式，适用于某一类、某个目录或某个模式下的所有 less 文件的引入。  

## 静态引入


静态引入是基础的、标准的单个引入方式，适用于具体某个 less 文件的引入。  
静态引入的语法是采用标准 `<link />` 标签，但 `rel` 属性值改为 `less`：

 `<link rel="less" href="xx.less" />`


如母版页 `index.master.html` 文件有如下代码，静态引入一个 less 文件 `modules/header.less`：


``` html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title></title>
        <meta />
        <!-- 这里以静态的方式引入了一个 less 文件 -->
        <link rel="less" href="modules/header.less" />
        ...
    </head>
    <body>
        ...
    </body>
</html>

```



给编译后生成的 `index.html` 页面对应部分为：

```html
<link rel="stylesheet" href="style/css/modules.header.css?9A81" />
```

less 是输入，css 是输出，则数学表达式为：

`css = f(less)`

在上面的例子中，则为

`modules/header.less`  ->  `style/css/modules.header.css?9A81`





## 动态引入

动态引入是扩展的、批量的引入方式，适用于某一类、某个目录或某个模式下的所有 less 文件的引入。  
动态引入的 less 文件的顺序是不确定的，因此只适用于引入顺序无关的场景。

在某些项目中，需要动态的、批量的自动引入某一类、某个目录或某个模式下的所有 html 片段文件。   
如在`单页应用(SPA)` 里，存在多个并列的视图，每个视图都有一个对应的 less 文件，它们相互独立。
此时，需要提供一种机制，可以动态的、批量的引入各个视图对应的 less 文件，并且引入的顺序无关紧要的。


如母版页 `index.master.html` 文件有如下代码，批量引用 less 文件：

```html

<!--weber.css.begin-->
<script>
    [
        'style/less/global.less',
        'style/less/component.less',
        'lib/**/*.less',
        'modules/**/*.less',
    ]
</script>
<!--weber.css.end-->

```
假设有如下目录结构：

```pre
style/
    less/
        global.less
        component.less
```

``` pre
lib/
    dialog.less    
    menu.less

```


```pre
modules/
    home.less
    user.less
    demo/
        table.less
```


生成 `<link>` 标签使用的 html 模板为 `<link rel="stylesheet" href="{href}" />`，  
则给编译后生成的 `index.html` 页面对应部分为：

```html
<!--weber.css.begin-->
<link rel="stylesheet" href="style/css/style.less.global.css?4AB4" />
<link rel="stylesheet" href="style/css/style.less.component.css?8D80" />
<link rel="stylesheet" href="style/css/lib.dialog.css?D41D" />
<link rel="stylesheet" href="style/css/lib.menu.css?B2A4" />
<link rel="stylesheet" href="style/css/modules.home.css?A6AF" />
<link rel="stylesheet" href="style/css/modules.user.css?F4A2" />
<link rel="stylesheet" href="style/css/modules.demo.table.css?D749" />
<!--weber.css.end-->
```



## 缓存与刷新
细心的读者可能已经发现，`<link>` 标签中的 `href` 属性值部分，以 `?` 作为分隔符，包含两部分：`css` 文件路径部分和 `query` 部分。
`query` 部分是整个 css 文件的内容的 `md5` 值的子串（取前 4 位，如 `9A81`）。 

通过以文件内容的摘要作为查询字符串，可以有效解决缓存和刷新的效率问题。
只有文件的内容发生了变化，`md5` 摘要和 `href` 中的查询字符串才会发生变化，从而相当于引入了一个新版本的 css 文件，刷新了缓存。
而内容没有变化的 less 文件，则使用之前加载过的、对应的缓存版本的 css 文件，从而提高了缓存利用率。

**通过通配符批量自动引入文件的机制非常强大，非常适合团队的分工协作。 **

## css 文件命名冲突的解决

所有的 less 文件都会给编译成 css 文件，并存放到配置的指定目录，如 `style/css/`。  
为了方便开发阶段进行调试，`auto-weber` 自动化开发工具会把编译生成的 css 文件与源 less 文件的短文件名保持一致，如 `header.less` 会给编译成 `header.css`。
如果采取短命名方案，则可能会造成 css 文件名冲突。  
为了解决此问题，`auto-weber` 自动化开发工具采用了路径转名称的方案，即把源 less 文件所在的部分相对路径作为输出 css 文件的名称，  
如 `a/b/c.less`，输出 `a.b.c.css`。  

此方案仅用于开发阶段，目的是为了保留源 less 文件与目标 css 文件的对应关系，方便开发人员可以通过 css 文件名快速定位到对应的 less 文件调试和修改。

 ![](data/weber/img/less2css.png)


##引入顺序无关

通过动态引入一组 less 文件的顺序是不能确定，它们的顺序跟它们所在的目录和文件名有关，并且按照一定的排序规则进行引入的。

**一组 less 文件如果能满足引入(执行)顺序无关的要求，则可以、应该使用动态引入的方式进行批量的、自动化的引入**。  
这样可以极大地提高 less 文件引入到页面的效率，让开发者解放出来做更有意义的事情。


##特点
- 母版页中引用的 less 文件会被编译成对应的 css 文件到配置的目录(如 `style/css/`)，并且具有唯一名称。
- `auto-weber` 自动化开发工具会搜索对应的 less 文件，转换成带 css 文件名的 `<link />` 标签，插入到页面中。
- 引用地址中会带上对应于文件内容的 `md5` 值作为 `query` 部分，提高了缓存利用效率，减少了刷新等待时间。
- 整个过程都是自动进行的，避免人工手动去操作，提高了开发者效率，同时减少了因操作母版页而引起的冲突。