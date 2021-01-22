

define.route('Outline', function (require, module, exports, Outline) {
    const Main = module.require('Main');


    //对应于加载到的 config.json 的对象。
    //用于在简明模式和正常模式中切换。


    return {
        'item': function (item, index) {
            Main.toOutline(index);
        },
    };
});