

#引入 html 片段文件


一个完整的 html 页面包含了几个必要的标签 `<DOCTYPE>`、`<html>`、`<head>` 和 `<body>`：

``` html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title></title>
        <meta />
        <link />
        ...
        <script></script>
    </head>
    <body>
        <!-- 这里可能有几千行 html 代码 -->
        ...
    </body>
</html>

```


## html 片段文件

从字符串内容的角度来看，一个完整的 html 页面只是一个带有多行的、很长的字符串，因此可以从物理上把它们分解成一个个的片段。
html 片段不是一个完整的 html 页面，相反，它是 html 页面中的一个片段或部分内容。 
从 html 页面中划分出一个片段或部分内容，保存成一个单独的文件，就成了 `html 片段文件`，它是 `html 页面文件` 的分解结果和组成部分。 

示例： `sidebar.html` 片段文件

``` html
<nav>
    <ul>
        <li>用户</li>
        <li>设置</li>
        <li>通知</li>
    </ul>
</nav>
```



在一些项目中， html 页面可能会比较庞大，代码量可能会达到几千行，甚至上万行，尤其是在`单页应用(SPA)`模式中。
在团队的分工与协作中，如果采用传统的方式对这个庞大的页面进行开发和维护，则成本是极高的，也是相当困难的，甚至不可行。
因为团队中的多个成员共同去操作同一个页面文件，很容易引发冲突；而且在海量的 html 代码中滚动到指定位置修改东西，本身就极其容易出错，也相当乏味。
再者，对于业务功能的模块化、文件的归类管理也不友好。
因此，需要采用**`分而治之`**的策略对它进行物理分解，分解成足够小的模块片段，分解的粒度是小到可以解决上述的问题。最后通过自动化工具进行编译，合并成最终要运行的目标页面。

具体来说，就是把目标页面物理分解成一个母版页和若干个、若干层级的 html 片段文件，
然后通过在母版页、html 片段中用特定的语法标签把另外的 html 片段文件引进来，`auto-weber` 自动化开发工具会编译母版页，
把引用到的 html 片段文件的内容读出来，替换掉引用标签，从而生成一个完整的、浏览器可运行的页面。  






##工作原理

作为讨论，这里简单展示一下 `auto-weber` 是如何处理自动引入 html 片段树的。
以母版页为输入源，从引用关系分析出若干层级的引用树，用对应的文件内容替换掉引用标签，最后编译生成浏览器可识别的、可运行的页面。
 

![](data/weber/img/html-flow.png)

##特点
- 实时编译与混入，保存、刷新即生效。
- 混入后保持原有的缩进格式。
- 支持递归引入，html 片段里可以继续引入其它子片段。
- 支持短名称（相对路径）引入子片段，有利于自适应后期文件名和目录的变更。

> 要引入 html 片段，有 **静态引入** 和 **动态引入** 两种方式。  
静态引入是基础的、标准的单个引入方式，适用于具体某个 html 片段文件的引入。  
动态引入是扩展的、批量的引入方式，适用于某一类、某个目录或某个模式下的所有 html 片段文件的引入。  

## 静态引入
**静态引入是基础的、标准的单个引入方式，适用于具体某个 html 片段文件的引入。   **

静态引入的语法是采用标准 `<link />` 标签，但 `rel` 属性值改为 `html`：

 `<link rel="html" href="xx.html" />`

如母版页 `index.master.html` 文件有如下代码，静态引入一个 html 片段文件：

```html
<div>hello, auto-weber</div>

<!--静态引入 html 片段文件-->
<link rel="html" href="modules/section.html" />

<div>goodbye!</div>
```

其中 html 片段文件 `modules/section.html` 的内容如下：

```html
<!--section.html-->
<section>
    内容区 aaaaa
    <div>bbbbb</div>
</section>

```

则 `index.master.html` 给编译后生成的 `index.html` 页面对应部分为：

```html
<div>hello, auto-weber</div>

<!--静态引入 html 片段文件-->
<!--section.html-->
<section>
    内容区 aaaaa
    <div>bbbbb</div>
</section>

<div>goodbye!</div>

```

编译的过程是把要引入的文件 `modules/section.html` 的内容读取出来，替换掉母版页中的引用标签  
`<link rel="html" href="modules/section.html" />`  

###缩进

`auto-weber` 还会保持引用标签中的缩进格式，即把引用标签当作一个整体进行替换，同时保留它前面的缩进量。  

例如，我们把 `<link />` 标签向右缩进 4 个空格：

```html
<div>hello, auto-weber</div>
    <!--link 标签向右缩进 4 个空格-->
    <link rel="html" href="modules/section.html" />

<div>goodbye!</div>
```

则混入的目标内容，整体也会向右缩进 4 个空格：

```html
<div>hello, auto-weber</div>
    <!--link 标签向右缩进 4 个空格-->
    <!--section.html-->
    <section>
        内容区 aaaaa
        <div>bbbbb</div>
    </section>

<div>goodbye!</div>

```
通过保留目标 html 片段在目标页面的缩进，可以满足特定场景的需要，对于某些标签如 `<pre></pre>` 就非常有用。




##动态引入

**动态引入是扩展的、批量的引入方式，适用于某一类、某个目录或某个模式下的所有 html 片段文件的引入。  **
动态引入的 html 片段文件的顺序是不确定的，因此只适用于引入顺序无关的场景。

在某些项目中，需要动态的、批量的自动引入某一类、某个目录或某个模式下的所有 html 片段文件。   
如在`单页应用(SPA)` 里，存在多个并列的视图，任一时刻，有且仅有一个视图是显示的，其它视图都是隐藏的。
视图的 html 被包裹在一个顶级节点中，如 `<div></div>`，它们各自出现的顺序无关紧要，因为是并列和互斥关系。
此时，需要提供一种机制，可以动态的、批量的引入各个视图的 html 片段文件，并且引入的顺序无关紧要的。



``` html
<!--weber.html.begin-->
<script>
    [
        'views/**/*.html',
        'modules/footer.html',
    ]
</script>
<!--weber.html.end-->
```

`auto-weber` 在解析上面的 html 内容时，会把它当成动态引入进行处理，
具体来说，先解析里面的 `<script></script>` 中的数组，得到一个文件路径模式列表，然后搜索相应的文件，最后转成标准的
 `<link rel="html" href="xx.html" />` 格式插入到母版页的临时处理结果中，最后交由静态引入的处理模块进行混入。   

假如项目中具有如下目录结构：

 ``` pre
 views/
    a.html
    b.html
    c.html

    users/
        menu.html
        list.html

 ```

 则转换后的中间结果是：

 ``` html

<!--weber.html.begin-->
<link rel="html" href="views/a.html" />
<link rel="html" href="views/b.html" />
<link rel="html" href="views/c.html" />
<link rel="html" href="views/users/menu.html" />
<link rel="html" href="views/users/list.html" />
<link rel="html" href="modules/footer.html" />
<!--weber.html.end-->

```
下一步是走静态引入的处理流程。


##递归引入

** 递归引入通俗点讲，就是在 html 片段中引入另一个 html 片段。**

我们知道，可以在母版页中通过 `<link rel="html" href="xx.html" />` 标签引入 `xx.html` 片段文件。
同样的，`auto-weber` 也支持在被引入的 `xx.html` 片段文件中继续引入其它的 html 片段文件。
到目前为止，自动化工具仅支持在 html 片段文件中以静态的方式引入其它 html 片段文件，后续可能会支持动态引入。

  
在模块化的组件设计或业务功能开发中，经常需要把一组具有相关性的资源文件放在一个目录或其子目录下，并且在父级模块中使用相对路径来引用。
因此，在 html 片段中使用相对路径引入下级 html 子片段就很有必要，`auto-weber` 正提供了这种功能。

接上面静态引入的例子，假如 `modules/section.html` html 片段文件继续引入了一个子片段：
```html

<!--section.html-->
<section>
    内容区 aaaaa
    <div>bbbbb</div>
    <link rel="html" href="./tabs/panel.html" />
</section>

```

`modules/tabs/panel.html` 内容如下：

```html

<ul>
    <li>tab-A</li>
    <li>tab-B</li>
</ul>

```

编译后的结果：

```html
<div>hello, auto-weber</div>

<!--section.html-->
<section>
    内容区 aaaaa
    <div>bbbbb</div>

    <ul>
        <li>tab-A</li>
        <li>tab-B</li>
    </ul>
</section>

<div>goodbye!</div>

```

混入算法是，用目标片段替换源引用标签，然后作为一个整体参与到上一级的引用标签的替换。


## html片段树
从递归引入的特性可以看出，母版页和它所引入的 html 片段文件，以及 html 片段文件再引入其它的 html 片段文件，所有的这些资源文件从引用关系上组成了一棵以母版页为根节点的树。
 
![](data/weber/img/html-tree.png)

## 未来展望

在未来的 w3c 标准中，**如果浏览器可以原生支持** 直接在页面中使用特定的语法标签引入 `html 片段文件`，
然后自动加载目标 html 片段文件进来进行替换，那将是一项多么激动人心的特性啊。
这样将会更有利于划分功能模块和组织目录结构，把相关的 html 片段文件跟相应的 js 模块文件放在同一个目录或其子目录下，更有利于大型 web 项目模块化对文件的管理。

``` html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title></title>
        <meta />
        <link />
        ...
        <script></script>
    </head>
    <body>
        <link rel="html" href="modules/sidebar.html" />
        ...
    </body>
</html>

```








