
#auto-weber

auto-weber 是一个 node.js 工具包。 

npm 安装:

`npm install auto-weber`


##介绍

auto-weber 是一个用 node.js 编写的 web 自动化开发工具包，主要用于协助 web 开发者快速开发、构建 web 页面，具有轻巧、快速、灵活配置等特点：

- 纯 node.js 编写
- 配置多样化
- 命令简单化
- 输出日志详尽
- 开发环境和构建环境独立
- 智能化

它可以：
- 自动引入和编译 less 文件。
- 自动引入 css 文件。
- 自动引入 html 片段文件。
- 自动引入 js 文件。


##快速开始

auto-weber 处理的是一个母版页(`index.master.html`)

``` html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>auto-weber demo</title>
    <meta charset="utf-8" />

    <!--weber.css.begin-->
    <script>
        [
            'modules/header.less',
            'modules/section.less',
            'modules/footer.less',
        ]
    </script>
    <!--weber.css.end-->
</head>
<body>
    
    <div>AAAA --这是母版页中的原有内容，位上顶部-- AAAA</div>

    <link rel="html" href="modules/header.html" />
    <link rel="html" href="modules/section.html" />
    <link rel="html" href="modules/footer.html" />

    <div>BBBB --这是母版页中的原有内容，位于底部-- BBBB</div>

</body>
</html>

```

经过运行命令 `node watch` 编译后得到 `index.html` 页面：

```html

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>auto-weber demo</title>
    <meta charset="utf-8" />

    <!--weber.css.begin-->
    <link href="style/css/modules.header.css?9A81" rel="stylesheet" />
    <link href="style/css/modules.section.css?BA0F" rel="stylesheet" />
    <link href="style/css/modules.footer.css?4529" rel="stylesheet" />
    <!--weber.css.end-->
    
</head>
<body>
    
    <div>AAAA --这是母版页中的原有内容，位上顶部-- AAAA</div>

    
    <!--header.html-->
    <header>顶部</header>
    
    
    <!--section.html-->
    <section>
        内容区  bbbbb
    </section>
    
    <!--footer.html-->
    <footer>底部</footer>

    <div>BBBB --这是母版页中的原有内容，位于底部-- BBBB </div>

</body>
</html>



``` 