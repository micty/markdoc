

define.route('Sidebar', function (require, module, exports, Sidebar) {
    const Router = module.require('Router');
    const Main = module.require('Main');
    const Title = module.require('Title');




    //侧边栏菜单列表。
    return {
        'item': function (id, openNew) {
            Router.add('item', id, openNew);
        },
        'active': function (url) {
            url = Router.normalize(url);
            Main.render({ 'url': url, 'sidebar': true, });
        },
        '404': function (url, data) {
            Main.notfound(url, data);
            Title.render(404);
        },
    };
});