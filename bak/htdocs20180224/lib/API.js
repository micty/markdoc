
/**
* 
*/
define('API', function (require, module, exports) {

    var KISP = require('KISP');
    var Emitter = KISP.require('Emitter');
    var $ = require('$');
    var JSON = KISP.require('JSON');
    var Url = require('Url');


    var mapper = new Map();
    var $emitter = new Emitter();   //针对静态的。
    var url$data = {};
    var defaults = KISP.data(module.id);


    /**
    * 构造器。
    */
    function API(url) {
        var ext = Url.extname(url);
        var isOrigin = url.startsWith('@');

        if (isOrigin) {
            url = url.slice(1);
        }

        //这个关闭，否则在内容区会死循环加载。
        if (ext == 'html' || ext == 'htm') {
            isOrigin = false; 
        }

        var meta = {
            'url': url,
            'ext': ext,
            'isOrigin': isOrigin,
            'emitter': new Emitter(this),
        };

        mapper.set(this, meta);
    }




    API.prototype = {
       
        /**
        * 获取。
        */
        get: function () {
            var meta = mapper.get(this);
            var url = meta.url;
            var emitter = meta.emitter;
            var ext = meta.ext;
            var isOrigin = meta.isOrigin;
            var data = url$data[url];

            //优先从内存中读取。
            if (data) {
                if (ext == 'json' && !isOrigin) {
                    data = JSON.parse(data);          //拷贝一份。
                }

                emitter.fire('success', [data, {
                    'url': url,
                    'ext': ext,
                    'isOrigin': isOrigin,
                }]);


                return;
            }


            
            $.ajax({
                'url': url,
                'cache': defaults.cache,    //缓存。
                'dataType': 'text',         //这里作为纯文本去获取，获取到后再解析，这样可以对 json 格式没那么严格。     

                'success': function (data) {
                    url$data[url] = data;

                    if (ext == 'json' && !isOrigin) {
                        data = JSON.parse(data);
                    }

                    emitter.fire('success', [data, {
                        'url': url,
                        'ext': ext,
                        'isOrigin': isOrigin,
                    }]);
                },

                'error': function (xhr, type, msg) {
                    emitter.fire('error');
                    $emitter.fire(xhr.status, [url]);
                },
            });
        },

        /**
        * 绑定事件。
        */
        on: function (name, fn) {
            var meta = mapper.get(this);
            meta.emitter.on(...arguments);
        },
    };



    //静态方法。
    API.on = $emitter.on.bind($emitter);


    return API;



});
