
/**
* 
*/
define('/Router/Config', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const API = require('API');
    const Url = require('Url');

    const Header = module.require('Header');
    const Footer = module.require('Footer');

    let emitter = new Emitter();


    return {
        'on': emitter.on.bind(emitter),

        'get': function (url) {

            let api = new API(url);

            api.on({
                'request': function () {
                    emitter.fire('loading');
                },

                'success': function (data, options) {
                    let url = options.url;
                    let json = JSON.stringify(data);

                    json = JSON.parse(json) || {};


                    [ 'file', 'sidebar', ].forEach(function (key) {
                        let file = json[key];
                        if (!file) {
                            return;
                        }

                        json[key] = Url.relative(url, file);

                    });

                    Header.normalize(json.header, url);
                    Footer.normalize(json.footer, url);
                  
                    emitter.fire('success', [json, url]);
                },

                'error': function () {
                    definejs.alert(`加载 ${url} 失败，请稍候刷新重试。`);
                },
            });

            api.get();

        },

    };

});





    