
/**
*/
define('MarkDoc/Content/Code/Lines', function (require, module, exports) {

    return exports = {

        /**
        *  
        */
        parse: function (content) {
            let lines = content.split(/\r\n|\n|\r/);
            let height = exports.getHeight(lines);


            //最后一个空行要去掉。
            //因为它在 `<pre></pre>` 中无法展示出来。
            let lastLine = lines[lines.length - 1];
         
            //if (!lastLine) {
            //    lines = lines.slice(0, -1);
            //}


            let total = lines.length;
            let length = total.toString().length; //最大的行号的数字串的长度
            let width = length * 10 + 15;


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
