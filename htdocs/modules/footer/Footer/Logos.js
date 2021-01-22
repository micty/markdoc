
define.panel('/Footer/Logos', function (require, module, panel) {
    let list = [];

    panel.on('init', function () {

        panel.$.on('click', 'li[data-index]', function () {
            let li = this;
            let index = +li.getAttribute('data-index');
            let item = list[index];

            panel.fire('file', [item.file]);

        });
    });



    panel.on('render', function (data) {

        list = data;
        panel.fill(list, function (item, index) {
            return {
                'index': index,
                'name': item.name,
                'logo': item.logo,
            };
        });

    });


});
