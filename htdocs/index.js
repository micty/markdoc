
KISP.launch(function (require, module) {

    var Router = module.require('Router');
    var Sidebar = module.require('Sidebar');
    var Header = module.require('Header');
    var Main = module.require('Main');
    var Footer = module.require('Footer');
    var Scroller = module.require('Scroller');
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
            Main.render(url);
        },
    });

    Scroller.on({
        'leave': function () {
            Header.addClass('leave');
            Sidebar.addClass('leave');
        },
        'top': function () {
            Header.removeClass('leave fixed');
        },
        'return': function () {
            Sidebar.removeClass('leave');
        },
        'up': function () {
            Header.addClass('fixed');
        },
        'down': function () {
            Header.removeClass('fixed');
        },
        'reset': function () {
            Header.removeClass('fixed');
        },
    });


    FixedMenus.on({
        'outline': function () {
            Main.outline();
        },
    });

    Main.on({
        'render': function (data) {
            FixedMenus.render(data);
            Scroller.render();
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
            Header.removeClass('leave fixed');
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
            Main.render(url);
        },
        404: function (url) {
            Main.notfound(url);
        },
    });

    Router.render();


});



