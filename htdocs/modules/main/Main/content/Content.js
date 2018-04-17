
KISP.panel('/Main/Content', function (require, module, panel) {
    var $ = require('$');
    var KISP = require('KISP');
    var MarkDoc = require('MarkDoc');
    var Loader = module.require('Loader');

    var markdoc = null;
   

    panel.on('init', function () {

        panel.$.on('click', 'code', function (event) {
            panel.fire('line', [event.offsetY]);
        });


        markdoc = new MarkDoc({
            container: panel.$.find('[data-id="content"]'),
        });


        
        markdoc.on('render', function (data) {

            var outlines = markdoc.getOutlines();

            panel.fire('render', [{
                'title': data.title,
                'outlines': outlines,
            }]);

        });


        markdoc.on('hash', function (href) {
            panel.fire('hash', [href]);
        });
    });




    /**
    *   options = {
    *       url: '',        //文档的 url 地址。
    *       fadeIn: true,   //是否淡入显示。
    *   };
    */
    panel.on('render', function (options) {
        //如果 100ms 内能完成请求，则不显示 loading。
        //否则就显示 loading 至少 800ms，以避免内容太快回来而闪一下。
        var loading = false;
        var fadeIn = options.fadeIn;

        //100ms 后开始显示 loading。
        var tid = setTimeout(function () {
            loading = true;
            panel.fire('loading');
        }, 100);

        
        panel.$.toggleClass('fadeIn', !!fadeIn);
        panel.$.removeClass('show');
        markdoc.hide();


        Loader.load(options.url, function (content, data) {

            //已经显示了 loading，则让它显示 800ms 后再隐藏。
            loading ? setTimeout(show, 800) : show();


            function show() {
                loading = false;
                clearTimeout(tid);

                //要在浏览器中显示的标题
                markdoc.render({
                    'content': content,
                    'baseUrl': data.url,
                    'language': data.isOrigin ? data.ext : '',
                    'imgUrl': data.imgBase, //img 标签的基准地址。
                });

                markdoc.show();


                if (fadeIn) {
                    panel.$.addClass('show');
                }
            }
     
        });

    });






    return {

        //显示大纲
        'outline': function () {
            markdoc.outline();
        },

        'empty': function () {
            markdoc.empty(...arguments);
        },

        'toOutline': function (index) {
            markdoc.toOutline(index);
        },


    };

});
