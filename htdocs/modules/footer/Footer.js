
KISP.panel('/Footer', function (require, module, panel) {
    const Copyright = module.require('Copyright');
    const Logos = module.require('Logos');
    const Menus = module.require('Menus');


    panel.set('show', false); //禁用 render 后的自动显示。

    panel.on('init', function () {

        Menus.on({
            'file': function (file) {
                panel.fire('file', [file]);
            },
        });

        Logos.on({
            'file': function (file) {
                panel.fire('file', [file]);
            },
        });
    });



    panel.on('render', function (data) {
        //无数据，则隐藏，即禁用 footer。
        if (!data) {
            panel.hide();
            return;
        }

        //启用。
        Copyright.render(data.copyright);
        Logos.render(data.logos);
        Menus.render(data.menus);
        panel.show();

    });




});
