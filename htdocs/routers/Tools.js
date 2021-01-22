

define.route('Tools', function (require, module, exports, Tools) {
    const $ = require('$');
    const Sidebar = module.require('Sidebar');
    const Header = module.require('Header');
    const Main = module.require('Main');
    const Footer = module.require('Footer');
    const Outline = module.require('Outline');

    let $body = $(document.body);


    //对应于加载到的 config.json 的对象。
    //用于在简明模式和正常模式中切换。


    //右下角的固定工具栏。
    return {
        'outline': function () {
            var visible = Outline.toggle();
            Main.setPadding({ 'outline': visible, });
        },

        'print': function () {
            //切换打印模式和正常模式。
            function print() {
                Tools.$.toggleClass('print');
                Header.$.toggleClass('print');
                Sidebar.$.toggleClass('print');
                Main.$.toggleClass('print');
                Footer.$.toggleClass('print');
                Outline.$.toggleClass('print');
                $body.toggleClass('print');
            }

            print();

            //同步模式，打印窗口关闭后会有返回值。
            document.execCommand('print') && print();
        },
        'font': function (size) {
            console.log(size)
            Main.font(size);
        },
    };
});