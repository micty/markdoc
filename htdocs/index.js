
definejs.launch(function (require, module, exports) {
    const $ = require('$');

    let $body = $(document.body);
    $body.removeClass('loading');


    //启动路由解析。
    module.render('Router');

});



