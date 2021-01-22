

define.route('Router', function (require, module, exports, Router) {
    const Sidebar = module.require('Sidebar');
    const Header = module.require('Header');
    const Main = module.require('Main');
    const Footer = module.require('Footer');
    const Title = module.require('Title');
    const Outline = module.require('Outline');
    const Tools = module.require('Tools');


    //对应于加载到的 config.json 的对象。
    //用于在简明模式和正常模式中切换。
    let config = null;


    return {
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
            Main.notfound(url, { 'sidebar': false, });
            Outline.hide();
            Title.render(404);
        },
    };  
});
