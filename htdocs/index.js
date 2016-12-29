
KISP.launch(function (require, module) {

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
    });

    Sidebar.on({
        'item': function (id) {
            Router.add('item', id);
        },
        'active': function (url) {
            Main.render(url, true);
        },
        404: {
            'group': function (url, data) {
                Router.notfound(url, data);
            },
            'item': function (url, data) {
                Router.notfound(url, data);
            },
        },
    });

    Scroller.on({
        'leave': function () {
            Header.leave(true);
            Sidebar.leave(true);
        },
        'top': function () {
            Header.reset();
        },
        'return': function () {
            Sidebar.leave(false);
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
    });


    FixedMenus.on({
        'outline': function () {
            Main.outline();
        },
    });

    Main.on({
        'render': function (isCode, title) {
            Title.render(title);
            FixedMenus.render(isCode);
            Scroller.render();
        },
        'click': function () {
            Scroller.reset();
        },
        'hash': function (hash) {
            console.log(hash)
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
                Sidebar.logo(data.header.logo);
                Footer.render(data.footer);
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
            Main.render(url, false);
        },
        404: function (url, data) {
            Main.notfound(url, data);
            Title.render(404);
        },
    });

    Router.render();


});



