
define.panel('/Main/Content', function (require, module, panel) {
    const MarkDoc = require('MarkDoc');
    const Loader = module.require('Loader');

    let markdoc = null;
   

    panel.on('init', function () {



        markdoc = new MarkDoc({
            'container': panel.$.find('[data-id="content"]'),
        });


        
        markdoc.on('render', function (data) {
            let outlines = data.outlines;
            let first = outlines[0];
            let title = first ? first.text : '';

            panel.fire('render', [{
                'title': title,
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
        let loading = false;
        let fadeIn = options.fadeIn;

        //100ms 后开始显示 loading。
        let tid = setTimeout(function () {
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


               
                markdoc.render({
                    'content': content,
                    'baseUrl': options.url,
                    'language': data.isOrigin ? data.ext : '',
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

        'toOutline': function (index) {
            markdoc.toOutline(index);
        },

        'font': function (size) {
            markdoc.$.css({
                'font-size': size + 'px',
            });
        },

    };

});
