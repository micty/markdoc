
define('/Main/Content', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');

    var Helper = module.require('Helper');
    var Loader = module.require('Loader');
    var CurrentLine = module.require('CurrentLine');

    var panel = KISP.create('Panel', '#div-main-content');
    var visible = true;
    var titles = 'h1,h2,h3,h4,h5,h6,hr';


    panel.on('init', function () {

        panel.$.on('click', 'code', function (event) {
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

        Loader.load(url, function (content) {

            Helper.fill({
                'container': panel.$,
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
            var $ = panel.$.find('>*:not(' + titles + ')');
            var value = visible ? 'hide' : 'show';

            $.animate({
                'height': value,
                'opacity': value,
            }, 'fast');

            visible = !visible;
            
        },
    });

});
