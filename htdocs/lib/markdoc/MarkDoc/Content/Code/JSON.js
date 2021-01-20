
/**
*/
define('MarkDoc/Content/Code/JSON', function (require, module, exports) {
    const KISP = require('KISP');
    const JSON = KISP.require('JSON');


    return exports = {

        /**
        *  
        */
        format: function (content) {
            let json = JSON.parse(content);

            if (json) {
                content = JSON.stringify(json, null, 4);
            }

            return content;

        },


    };








});
