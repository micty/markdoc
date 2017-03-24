
/**
*/
define('/Main/Content/Helper/Highlight', function (require, module, exports) {

    var $ = require('$');
    var hljs = require('hljs');
    var JSON = require('JSON');


    function get(type,  code) {

        if (arguments.length == 1) { //重载 get(code)
            code = type;
            type = 'javascript';
        }

        if (!code) {
            return '';
        }
        
        //marked 库把 '<' 和 '>' 变成了 '&lt;' 和 '&gt;'，
        //这会影响 hljs 的解析，这里变回去。
        code = $.String.replaceAll(code, '&lt;', '<');
        code = $.String.replaceAll(code, '&gt;', '>');

        try {
            var obj = hljs.highlight(type, code);
            return obj.value;
        }
        catch (ex) { //不支持某种语法高亮时，直接原样返回
            return code;
        }

    }






    function auto(el) {

        $(el).find('code[data-language]').each(function () {

            var code = this;
            var type = code.getAttribute('data-language');
            var html = code.innerHTML;
            html = get(type, html); //高亮代码

            $(code).addClass('hljs').html(html);

        });
    }


    return {
        auto: auto,

    };


});
