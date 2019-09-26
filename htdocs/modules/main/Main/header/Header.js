﻿
/**
* 针对代码模式的头部工具栏。
*/
KISP.panel('/Main/Header', function (require, module, panel) {

    var $ = require('$');
    var KISP = require('KISP');
    var $String = KISP.require('String');

    var list = [
        { cmd: 'numbers', text: '行号', checked: true, },
        { cmd: 'comment', text: '注释', checked: true, },
        //{ cmd: 'empty', text: '空行', checked: true, },
        //{ cmd: 'mark', text: '当前行', checked: true, },
    ];


    panel.set('show', false);


    panel.on('init', function () {

        panel.$.on('click', '[data-index]', function () {
            var chk = this;
            var index = +chk.getAttribute('data-index');
            var item = list[index];
            var cmd = item.cmd;
            var checked = chk.checked;

            //在源代码比较多时，选中的动画会比较卡。
            //先让动画完成，再执行其它业务可避免此问题。
            if (checked) {
                setTimeout(function () {
                    panel.fire(cmd, [checked]);
                }, 200);
            }
            else {
                panel.fire(cmd, [checked]);
            }
            
        });

        panel.template({
            '': function (data) {
                var html = this.fill('html', data);
                return html;
            },

            'html': {
                '': function (data) {
                    var items = this.fill('item', data.list);

                    return {
                        'url': data.url,
                        'name': data.name,
                        'items': items,
                    };
                },
                'item': function (item, index) {

                    return {
                        'id': $String.random(),
                        'index': index,
                        'text': item.text,
                        'checked': item.checked ? 'checked': '',
                    };
                },
            },

        });

    });

    panel.on('render', function (data) {

        if (!data.isCode) {
            panel.hide();
            return;
        }

        panel.fill({
            'url': data.url,
            'name': data.name,
            'list': list,
        });

        panel.show();
       
    });



    return {
        'leave': function (sw) {
            panel.$.toggleClass('fixed', sw);
        },
    };



});
