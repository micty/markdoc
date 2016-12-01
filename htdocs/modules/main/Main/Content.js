
define('/Main/Content', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');

    var Helper = module.require('Helper');
    var Loader = module.require('Loader');
    var CurrentLine = module.require('CurrentLine');

    var panel = KISP.create('Panel', '#div-main-content');
    var visible = false;
    var titles = 'h1,h2,h3,h4,h5,h6,hr';
    var container = $('#div-main-content-container');
    var loading = null;

    panel.on('init', function () {

        panel.$.on('click', 'code', function (event) {
            console.log(event.offsetY);
            panel.fire('line', [event.offsetY]);
        });

        panel.$.on('click', titles, function () {
            $(this).nextUntil(titles).animate({
                height: 'toggle',
                opacity: 'toggle',
            });
        });
    });


    panel.on('render', function (url) {

        panel.$.addClass('loading');
        //loading = loading || KISP.create('Loading', {
        //    background: 'none',
        //    color: 'black',
        //    text: '加载中...',
        //});

        //loading.show();
        //return;
        Loader.load(url, function (content) {

            //loading.hide();
            visible = true;  //每次填充都要重置。
            panel.$.removeClass('loading');

            Helper.fill({
                'container': container,
                'content': content,
                'baseUrl': url,
            });
            

            panel.$.find(titles).each(function () {
                var els = $(this).nextUntil(titles);
                $(this).toggleClass('title', els.length > 0);
            });

            panel.fire('render');
     
        });

    });






    return panel.wrap({

        //显示大纲
        'outline': function () {
            var $ = container.find('>*:not(' + titles + ')');
            var value = visible ? 'hide' : 'show';

            $.animate({
                'height': value,
                'opacity': value,
            }, 'fast');

            visible = !visible;
            
        },

        'empty': Helper.empty,
    });

});
