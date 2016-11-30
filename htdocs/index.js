
KISP.launch(function (require, module) {

    var $ = require('$');

    var Config = module.require('Config');
    var Sidebar = module.require('Sidebar');
    var Main = module.require('Main');
    var Hash = module.require('Hash');
    var FixedMenus = module.require('FixedMenus');



    Sidebar.on({
        'item': function (id) {
            Hash.set('item', id);
        },
        'active': function (group, item) {
            var url = Config.getUrl(group, item);
            Main.render(url);
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
});



