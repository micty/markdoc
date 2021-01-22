

define.route('Scroller', function (require, module, exports, Scroller) {
    const Sidebar = module.require('Sidebar');
    const Header = module.require('Header');
    const Main = module.require('Main');



    //对应于加载到的 config.json 的对象。
    //用于在简明模式和正常模式中切换。


    //滚动器。
    return {
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
    };

});