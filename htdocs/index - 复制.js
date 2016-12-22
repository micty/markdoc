
KISP.launch(function (require, module) {

    var $ = require('$');

    var Router = module.require('Router');
    var Config = module.require('Config');
    var Sidebar = module.require('Sidebar');
    var Header = module.require('Header');
    var Main = module.require('Main');
    var Hash = module.require('Hash');
    var Scroller = module.require('Scroller');
    var FixedMenus = module.require('FixedMenus');



    var API = require('API');
    var api = new API('data/header.json');

    api.get();


    Header.on({
        'search': function (value) {
            console.log('search:', value);
        },
        'group': function (group) {
            Hash.set('config', group.file);
        },

        'item': function (item) {
            Hash.set('config', item.file);
        },

    });

    Sidebar.on({
        'item': function (id) {
            Hash.set('item', id);
        },
        'active': function (group, item) {
            var url = Config.getUrl(group, item);
            Main.render(url);
        },
        'mouseover': function () {
            Header.hover(true);
        },

        'mouseout': function () {
            Header.hover(false);
        },
    });

    Scroller.on({
        'leave': function () {
            Header.addClass('leave');
            $('#div-panel-sidebar').addClass('fixed');
        },
        'top': function () {
            Header.removeClass('leave fixed');
        },
        'return': function () {
            $('#div-panel-sidebar').removeClass('fixed');
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
            Header.render();
            FixedMenus.render(data);
            Scroller.render();
        },
        'click': function () {
            Scroller.reset();
        },
    });


    Config.on('ready', function (json) {
        Sidebar.render(json.sidebar);
    });

    Hash.on({
        'none': function () {
            Sidebar.hide();
            Main.render('data/readme.md');
        },

        'config': function (url) {
            Config.load(url);
        },

        'item': function (id) {
            Sidebar.active(id);
        },

        'file': function (url) {
            Sidebar.hide();
            Main.render(url);
        },
    });

    Hash.render();


    Router.on({
        'config': function (url) {

        },

    });


});



