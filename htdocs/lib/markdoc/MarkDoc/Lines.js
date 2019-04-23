
/**
*/
define('MarkDoc/Lines', function (require, module, exports) {

    var $ = require('$');
    var KISP = require('KISP');
    var $String = KISP.require('String');


    return exports = {

        /**
        *  产生行号的 html。
        */
        getNumbers: function (meta, content) {
            var sample = meta.samples['numbers'];
            var sitem = meta.samples['numbers.item'];
            var lines = content.split(/\r\n|\n|\r/);
            var height = exports.getHeight(lines);

            //最后一个空行要去掉。
            //因为它在 `<pre></pre>` 中无法展示出来。
            var lastLine = lines[lines.length - 1];

            if (!lastLine) {
                lines = lines.slice(0, -1);
            }

            var list = lines.map(function (item, index) {

                return $String.format(sitem, { 'no': index + 1, });
            });

            var total = list.length;
            var length = total.toString().length; //最大的行号的数字串的长度
            var width = length * 10 + 15;



            var html = $String.format(sample, {
                'width': width,
                'height': height,
                'total': total,
                'items': list.join(''),
            });


            return {
                'width': width,
                'height': height,
                'total': total,
                'html': html,
                'list': list,
            };
        

        },


        /**
        * 根据文本内容计算需要的高度。
        */
        getHeight: function (lines) {
            if (!Array.isArray(lines)) {
                lines = lines.split(/\r\n|\n|\r/);
            }

            return lines.length * 20;
        },
    };








});
