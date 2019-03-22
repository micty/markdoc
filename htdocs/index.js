
KISP.launch(function (require, module) {
    var $ = KISP.require('$');
    var Router = module.require('Router');
    var Sidebar = module.require('Sidebar');
    var Header = module.require('Header');
    var Main = module.require('Main');
    var Footer = module.require('Footer');
    var Scroller = module.require('Scroller');
    var Title = module.require('Title');
    var Outline = module.require('Outline');
    var Tools = module.require('Tools');



    //对应于加载到的 config.json 的对象。
    //用于在简明模式和正常模式中切换。
    var config = null; 

    //头部。
    Header.on({
        'search': function (value) {
            console.log('search:', value);
        },
        'menu': function (url) {
            Router.auto(url);
        },
        'visible': function (visible) {
            Scroller.setTop(visible);
            Main.setTop(visible);
        },
    });

    //侧边栏菜单列表。
    Sidebar.on({
        'item': function (id, openNew) {
            Router.add('item', id, openNew);
        },
        'active': function (url) {
            url = Router.normalize(url);
            Main.render({ 'url': url, 'sidebar': true, });
        },
        404: function (url, data) {
            Main.notfound(url, data);
            Title.render(404);
        },
    });

    //滚动器。
    Scroller.on({
        'leave': function () {
            Header.leave(true);
            Main.leave(true);
        },
        'top': function () {
            Header.reset();
            Main.leave(false);
        },
        'return': function () {
            Header.leave(false);
            Main.leave(false);
        },
        'up': function () {
            Header.fixed(true);
        },
        'down': function () {
            Header.fixed(false);
        },
        'reset': function () {
            Header.fixed(false);
        },
        'x': function (x) {
            Header.setLeft(x);
            Sidebar.setLeft(x);
        },
    });

    //右下角的固定工具栏。
    Tools.on({
        'outline': function () {
            var visible = Outline.toggle();
            Main.setPadding({ 'outline': visible, });
        },

        'print': function () {
            //切换打印模式和正常模式。
            function print() {
                Tools.$.toggleClass('print');
                Header.$.toggleClass('print');
                Sidebar.$.toggleClass('print');
                Main.$.toggleClass('print');
                Footer.$.toggleClass('print');
                Outline.$.toggleClass('print');
                $(document.body).toggleClass('print');
            }

            print();

            //同步模式，打印窗口关闭后会有返回值。
            document.execCommand('print') && print();
        },
        'font': function (size) {
            console.log(size)
            Main.font(size);
        },
    });

    Main.on({
        'render': function (data) {
            Title.render(data.title);
            Tools.set(data.isCode);
            Scroller.render(data.isCode);

            Outline.render(data.outlines);

            if (data.outline) {
                Outline.show();
                Main.setPadding({ 'outline': true, });
            }
        },
        'click': function () {
            Scroller.reset();
        },
        'hash': function (hash) {
            Router.set(hash);
        },
    });

    Outline.on({
        'item': function (item, index) {
            Main.toOutline(index);
        },
    });

    Footer.on({
        'file': function (url) {
            Router.auto(url);
        },
    });


    Router.on({
        'change': function () {
            Header.reset();
        },

        //加载全局配置文件。
        'config': {
            'loading': function () {
                Main.loading();
            },
            //加载成功。
            'success': function (data) {
                config = data;

                Header.render(data.header);
                Sidebar.logo(data.header);  //设置备用 logo
                Footer.render(data.footer);
                Main.config(data.main);
                Tools.render(data.menus);
            },
        },
        /**
        * 在正常模式和简明模式中切换。
        * 简明模式是指隐藏 header、footer 等，只显示内容区。
        */
        'plain': function (isPlain) {
            Header.render(isPlain ? null : config.header);
            Footer.render(isPlain ? null : config.footer);
            //Tools.render(isPlain ? null : config.menus);
        },
        /**
        */
        'outline': function (isOutline) {
            Outline.toggle(isOutline);
            Main.config({ 'outline': isOutline, });
        },

        'sidebar': function (url, item) {
            Main.loading();
            Sidebar.render(url, item);
        },
        'item': function (id) {
            Sidebar.active(id);
        },
        'file': function (url) {
            Sidebar.hide();
            Main.render({ 'url': url, 'sidebar': false, });
        },
        '404': function (url) {
            Main.notfound(url, {'sidebar': false, });
            Outline.hide();
            Title.render(404);
        },
    });

    //启动路由解析。
    $(document.body).removeClass('loading');
    Router.render();


});



