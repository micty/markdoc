
/**
*/
define('MarkDoc/Content/Code/Highlight', function (require, module, exports) {
    const KISP = require('KISP');
    const $String = KISP.require('String');

    const hljs = require('hljs');


    return {

        render: function (type, code) {
            if (!code) {
                return '';
            }

            //marked 库把 '<' 和 '>' 变成了 '&lt;' 和 '&gt;'，
            //这会影响 hljs 的解析，这里变回去。
            code = $String.replaceAll(code, '&lt;', '<');
            code = $String.replaceAll(code, '&gt;', '>');

            try {
                let info = hljs.highlight(type, code);
                return info.value;
            }
            catch (ex) {
                //不支持某种语法高亮时，直接原样返回。
                return code;
            }

        }
    };


});
