
/**
* 
*/
define('/Config', function (require, module, exports) {


    var MiniQuery = require('MiniQuery');
    var Emitter = MiniQuery.require('Emitter');
    var JSON = require('JSON');
    var resolveUrl = require('resolveUrl');

    var emitter = new Emitter();
    var current = {};


    return {
        'on': emitter.on.bind(emitter),

        'load': function (url) {
            current.url = url;

            JSON.load(url, function (json) {
                current.json = json;
                emitter.fire('ready', [json]);
            });
        },


        'getUrl': function (group, item) {
            
            var base = group.base || '';
            var ext = group.ext || '';
            var file = item.file;

            file = base + file + ext;
            file = resolveUrl(current.url, file);

            return file;
        },
    };

});





    