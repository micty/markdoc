
/**
* 
*/
define('MarkDoc/Content/Href', function (require, module, exports) {
    const Url = module.require('Url');

    return {
        /**
        * 
        */
        init: function (meta) {
            let panel = meta.panel;


            //点击超链接时。
            panel.$on('click', {
                'a[href^="#"]': function (event) {
                    let a = this;
                    let href = a.getAttribute('href');

                    event.preventDefault();
                    meta.emitter.fire('hash', [href]);

                },
            });


           

        },



        /**
        * 
        *   opt = {
        *       baseUrl: '',
        *   };
        */
        render: function (meta, opt) {
            let panel = meta.panel;
            let baseUrl = opt.baseUrl;

            if (!baseUrl) {
                return;
            }


            //改写 a 标签。
            panel.$.find('a').each(function () {
                let a = this;

                //不要用 a.href，因为 a.href 在浏览器中会给自动补充成完整的 url，而我们是要获取最原始的。
                let href = a.getAttribute('href');

                if (!href) {
                    return;
                }


                //打开新标签。
                if (href.startsWith('#') || href.startsWith('?')) {
                    a.setAttribute('target', '_self');
                }

                href = Url.getHref(href, baseUrl);


                if (href.startsWith('?')) {
                    href = Url.getHash(href);
                }

                a.setAttribute('href', href);

            });

        },
    };
    
});


