
KISP.launch(function (require, module) {

    var $ = KISP.require('$');
    var Router = module.require('Router');
    var Sidebar = module.require('Sidebar');
    var Header = module.require('Header');
    var Main = module.require('Main');
    var Footer = module.require('Footer');
    var Scroller = module.require('Scroller');
    var Title = module.require('Title');
    var FixedMenus = module.require('FixedMenus');


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

    Sidebar.on({
        'item': function (id, openNew) {
            Router.add('item', id, openNew);
        },
        'active': function (url) {
            Main.render({ 'url': url, 'sidebar': true, });
        },
        404: function (url, data) {
            Main.notfound(url, data);
            Title.render(404);
        },
    });

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

    //切换打印模式和正常模式。
    function print() {
        FixedMenus.$.toggleClass('print');
        Header.$.toggleClass('print');
        Sidebar.$.toggleClass('print');
        Main.$.toggleClass('print');
        Footer.$.toggleClass('print');
        $(document.body).toggleClass('print');
    }

    FixedMenus.on({
        'outline': function () {
            Main.outline();
        },
        'print': function () {
            print();

            //同步模式，打印窗口关闭后会有返回值。
            document.execCommand('print') && print();
        },
    });

    Main.on({
        'render': function (isCode, title) {
            Title.render(title);
            FixedMenus.set(isCode);
            Scroller.render(isCode);
        },
        'click': function () {
            Scroller.reset();
        },
        'hash': function (hash) {
            Router.set(hash);
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
        'config': {
            'loading': function () {
                Main.loading();
            },
            'success': function (data) {
                Header.render(data.header);
                Sidebar.logo(data.header);
                Footer.render(data.footer);
                Main.config(data.main);
                FixedMenus.render(data.menus);
            },
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
    });

    Router.render();


});



