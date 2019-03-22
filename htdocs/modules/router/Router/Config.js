
/**
* 
*/
define('/Router/Config', function (require, module, exports) {
    var KISP = require('KISP');
    var $ = require('$');
    var Emitter = KISP.require('Emitter');
    var API = require('API');
    var Url = require('Url');

    var Header = module.require('Header');
    var Footer = module.require('Footer');

    var emitter = new Emitter();


    return {
        'on': emitter.on.bind(emitter),

        'get': function (url) {

            var api = new API(url);

            api.on({
                'request': function () {
                    emitter.fire('loading');
                },

                'success': function (data, options) {
                    var url = options.url;
                    var json = JSON.stringify(data);

                    json = JSON.parse(json) || {};


                    [ 'file', 'sidebar', ].forEach(function (key) {
                        var file = json[key];
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
                    KISP.alert(`加载 ${url} 失败，请稍候刷新重试。`);
                },
            });

            api.get();

        },

    };

});





    