

define.route('Main', function (require, module, exports, Main) {
    const Router = module.require('Router');
    const Scroller = module.require('Scroller');
    const Title = module.require('Title');
    const Outline = module.require('Outline');
    const Tools = module.require('Tools');


    //对应于加载到的 config.json 的对象。
    //用于在简明模式和正常模式中切换。


    return {
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
    };
});