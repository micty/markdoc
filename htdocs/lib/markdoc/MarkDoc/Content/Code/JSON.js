
/**
*/
define('MarkDoc/Content/Code/JSON', function (require, module, exports) {
    const JSON = require('@definejs/json');


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
