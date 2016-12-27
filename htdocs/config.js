
; (function () {


    KISP.data({
        'API': {
            cache: true,
        },
    });



    /**weber.debug.begin*/

    KISP.data({
        'API': {
            cache: false,
        },
    });

    //开发阶段，把 define 变成全局变量
    window.define = KISP.require('Module').define;
    window.$ = KISP.require('$');

    /**weber.debug.end*/

})();





