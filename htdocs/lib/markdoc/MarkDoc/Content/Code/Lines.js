
/**
*/
define('MarkDoc/Content/Code/Lines', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var $String = KISP.require('String');

    return exports = {

        /**
        *  
        */
        parse: function (content) {
            var lines = content.split(/\r\n|\n|\r/);
            var height = exports.getHeight(lines);


            //最后一个空行要去掉。
            //因为它在 `<pre></pre>` 中无法展示出来。
            var lastLine = lines[lines.length - 1];
         
            //if (!lastLine) {
            //    lines = lines.slice(0, -1);
            //}


            var total = lines.length;
            var length = total.toString().length; //最大的行号的数字串的长度
            var width = length * 10 + 15;


            return {
                'width': width,
                'height': height,
                'total': total,
                'lines': lines,
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
