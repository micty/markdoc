
/**
*/
define('/Main/Content/Helper/Lines', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    
    return {

        //产生行号的 html
        'getNumbers': function (code) {

            var lines = code.split(/\r\n|\n|\r/);

            lines = lines.map(function (item, index) {
                return '<li>' + (index + 1) + '</li>';
            });

            var html = '<ul>' + lines.join('') + '</ul>';

            return html;
        },

        //根据文本内容计算需要的高度。
        'getHeight': function (code) {
            var lines = code.split(/\r\n|\n|\r/);
            return lines.length * 20;
        },
    };








});
