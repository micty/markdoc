
/**
*/
define('/Main/Content/Helper/Lines', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    

    var sample = '<ul class="line-numbers" style="height: {height}px">{lis}</ul>';

    return exports = {

        //产生行号的 html
        'getNumbers': function (code) {

            var lines = code.split(/\r\n|\n|\r/);

            lines = lines.map(function (item, index) {
                return '<li>' + (index + 1) + '</li>';
            });

            var height = exports.getHeight(lines);

            var html = $.String.format(sample, {
                'height': height,
                'lis': lines.join(''),
            });

            return html;
        },

        //根据文本内容计算需要的高度。
        'getHeight': function (code) {
            var lines = Array.isArray(code) ? code :
                code.split(/\r\n|\n|\r/);

            return lines.length * 20;
        },
    };








});
