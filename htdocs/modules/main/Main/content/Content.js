
define('/Main/Content', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');

    var Helper = module.require('Helper');
    var Loader = module.require('Loader');
    var CurrentLine = module.require('CurrentLine');

    var panel = KISP.create('Panel', '#div-main-content', {
        //showAfterRender: false,
    });

    var visible = false;
    var titles = 'h1,h2,h3,h4,h5,h6';
    var container = $('#div-main-content-container');

    panel.on('init', function () {

        panel.$.on('click', 'code', function (event) {
            panel.fire('line', [event.offsetY]);
        });

        panel.$.on('click', titles, function (event) {
            if (event.target.tagName.toLowerCase() != 'span') {
                return;
            }

            $(this).nextUntil(titles).animate({
                height: 'toggle',
                opacity: 'toggle',
            });
        });

        panel.$.on('click', 'a[href^="#"]', function (event) {
            var a = this;
            var href = a.getAttribute('href');
      
            event.preventDefault();

            panel.fire('hash', [href]);
        });
    });


    panel.on('render', function (url, fadeIn) {


        //如果 100ms 内能完成请求，则不显示 loading。
        //否则就显示 loading 至少 800ms，以避免内容太快回来而闪一下。
        var loading = false;
        var title = '';         //要在浏览器中显示的标题
        container.hide();

        panel.$.toggleClass('fadeIn', !!fadeIn);
        panel.$.removeClass('show');

        var tid = setTimeout(function () {
            loading = true;
            panel.fire('loading');
        }, 100);

        function show() {
            loading = false;
            clearTimeout(tid);
            container.show();
            if (fadeIn) {
                panel.$.addClass('show');
            }

            panel.fire('render', [title]);
        }


        Loader.load(url, function (content, options) {

            visible = true;  //每次填充都要重置。

            Helper.fill({
                'container': container,
                'content': content,
                'baseUrl': url,
                'isOrigin': options.isOrigin,
                'ext': options.ext,
            });

            panel.$.find(titles).each(function () {

                var $this = $(this);

                if (!title) {
                    title = $this.text();
                }

                var els = $this.nextUntil(titles);
                $(this).toggleClass('title', els.length > 0);
            });


            if (loading) {
                setTimeout(show, 800);
            }
            else {
                show();
            }
     
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
