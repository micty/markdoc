

define.route('Footer', function (require, module, exports, Footer) {
    const Router = module.require('Router');

    return {
        'file': function (url) {
            Router.auto(url);
        },
    };
});