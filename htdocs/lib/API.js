
/**
* 
*/
define('API', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');
    var JSON = require('JSON');
    var Url = require('Url');

    var Emitter = MiniQuery.require('Emitter');
    var Mapper = MiniQuery.require('Mapper');

    var mapper = new Mapper();
    var $emitter = new Emitter();   //针对静态的。
    var url$data = {};
    var defaults = KISP.data(module.id);

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
            'emitter': new Emitter(this),
            'isOrigin': isOrigin,
        };

        mapper.set(this, meta);
    }




    API.prototype = {

        on: function (name, fn) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var args = [].slice.call(arguments);
            emitter.on.apply(emitter, args);
        },

        get: function () {
            
            var meta = mapper.get(this);
            var url = meta.url;
            var emitter = meta.emitter;
            var ext = meta.ext;
            var data = url$data[url];
            var isOrigin = meta.isOrigin;

            if (data) {
                if (ext == 'json' && !isOrigin) {
                    data = JSON.parse(data);          //拷贝一份。
                }

                emitter.fire('success', [data, url, isOrigin]);
                return;
            }


            
            $.ajax({
                'url': url,
                'cache': defaults.cache,      //缓存。
                'dataType': 'text', //这里作为纯文本去获取，获取到后再解析，这样可以对 json 格式没那么严格。     

                'success': function (data) {
                    url$data[url] = data;

                    if (ext == 'json' && !isOrigin) {
                        data = JSON.parse(data);
                    }

                    emitter.fire('success', [data, url, isOrigin]);
                },

                'error': function (xhr, type, msg) {
                    emitter.fire('error');
                    $emitter.fire(xhr.status, [url]);
                },
            });
        },
    };


    //静态方法。
    API.on = function () {
        var args = [].slice.call(arguments);
        $emitter.on.apply($emitter, args);
    };


    return API;



});
