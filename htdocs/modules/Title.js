
KISP.panel('/Title', function (require, module, panel) {
    let defaults = '';

    panel.on('render', function (data) {

        if (data == 404) {
            data = '404 Not Found';
        }


        defaults = defaults || data;

        let title = data || defaults;

        if (title) {
            title += ' - MarkDoc';
        }
        else {
            title = 'MarkDoc';
        }

        document.title = title;

    });


});
