
/**
* 
*/
KISP.panel('/Header/Search', function (require, module, panel) {
    panel.set('show', false);


    panel.on('init', function () {
        let txt = panel.$.find('input').get(0);
        let submiting = false;

        panel.$.on('focusin', txt, function () {
            panel.fire('focus');
        });

        panel.$.on('focusout', txt, function () {
            if (submiting) {
                setTimeout(function () {
                    panel.fire('blur');
                }, 400);
            }
            else {
                panel.fire('blur');
            }
        });

        panel.$.on('keyup', txt, function (event) {
            if (event.keyCode == 13) {
                panel.fire('submit', [txt.value]);
            }
        });

        panel.$.on('click', 'button', function () {
            panel.fire('submit', [txt.value]);
        });

        panel.$.on('mouseover', 'button', function () {
            submiting = true;
        });

        panel.$.on('mouseleave', 'button', function () {
            submiting = false;
        });
     
    });


    panel.on('render', function (data) {
        console.log(data);
        if (!data) {
            panel.hide();
        }
        else {
            panel.show();
        }
    });



});





