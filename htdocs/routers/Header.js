

define.route('Header', function (require, module, exports, Header) {
    const $ = require('$');
    const Router = module.require('Router');
    const Main = module.require('Main');
    const Scroller = module.require('Scroller');
    const Iframe = module.require('Iframe');

    let $body = $(document.body);

    return {
        'search': function (value) {
            console.log('search:', value);
        },

        'file': function (file) {
            Router.auto(file);
            Iframe.hide();
            $body.removeClass('iframe');
        },

        'url': function (opt) {
            if (opt.target == 'lelf') {
                location.href = opt.url;
            }
            else {
                window.open(opt.url);
            }
        },

        'iframe': function (opt) {
            Router.set('#');
            Iframe.render(opt);
            $body.addClass('iframe');
        },

        'visible': function (visible) {
            Scroller.setTop(visible);
            Main.setTop(visible);
        },
    };

});