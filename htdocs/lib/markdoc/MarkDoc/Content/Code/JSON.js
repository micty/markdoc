
/**
*/
define('MarkDoc/Content/Code/JSON', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var JSON = KISP.require('JSON');


    return exports = {

        /**
        *  
        */
        format: function (content) {
            var json = JSON.parse(content);

            if (json) {
                content = JSON.stringify(json, null, 4);
            }

            return content;

        },


    };








});
