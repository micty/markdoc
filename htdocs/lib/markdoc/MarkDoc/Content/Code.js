﻿
/**
* 
*/
define('MarkDoc/Content/Code', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var JSON = module.require('JSON');
    var Template = KISP.require('Template');
    var Lines = module.require('Lines');
    var Highlight = module.require('Highlight');




    //全选内容。
    function selectAll(txt) {
        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(txt);
        selection.removeAllRanges();
        selection.addRange(range);
    }



    return exports = {

        /**
        * 
        */
        init: function (meta) {
            var panel = meta.panel;
            var tpl = meta.tpl;
            var code = meta.code;   //代码区的配置。

            var toast = KISP.create('Toast', {
                duration: 1000,
                mask: 0,
                style: {
                    position: 'fixed',
                },
            });


            tpl.process('code', {
                '': function (data) {
                    var content = data.content;
                    var info = Lines.parse(content);

                    var type = this.fill('type', data);
                    var copy = this.fill('copy', {});
                    
                    var numbers = code.numbers ? this.fill('numbers', info) : '';   //指定了要生成行号，则根据内容生成行号。
                    var lines = this.fill('line', info.lines);

                    return {
                        'type': type,
                        'copy': copy,

                        'language': data.language,
                        'lines': lines,

                        'total': info.total,
                        'width': info.width,
                        'height': info.height,

                        'margin-left': numbers ? info.width : 0,    //根据是否显示行号来调整 `margin-left`。
                        'numbers': numbers,
                    };
                },

                'type': function (data) {
                    if (!code.type) {
                        return '';
                    }

                    return {
                        'language': data.language,
                        'foldable': code.foldable ? 'foldable' : '',
                    };
                },

                'copy': function () {
                    if (!code.copy) {
                        return '';
                    }

                    return {};
                },

                'numbers': {
                    '': function (info) {
                        var items = this.fill('item', info.lines);

                        return {
                            'total': info.total,
                            'width': info.width,
                            'height': info.height,
                            'items': items,
                        };

                    },

                    'item': function (line, index) {
                        return {
                            'no': index + 1,
                        };
                    },
                },

                'line': function (line, index) {

                    return {
                        'empty': line.trim() ? '': 'empty',    //是否为空行。
                        'index': index,
                        'line': line,
                    };
                },
            });

            if (code.foldable) {
                panel.$on('click', '[data-cmd="{value}"]', {
                    //点击语言标签时。
                    'language': function (event) {
                        var $div = $(this.parentNode);

                        $div.toggleClass('on');
                        event.stopPropagation();

                        setTimeout(function () {
                            $div.toggleClass('done');
                        }, 300);
                    },

                    //折叠起来时，整个源代码区别可点击。
                    'source-code': function (event) {
                        var $div = $(this);

                        $div.removeClass('on done');
                    },
                });
            }

            if (code.copy) {
                panel.$on('click', {
                    //复制代码。
                    '[data-cmd="copy"]': function (event) {
                        var $div = $(this.parentNode);
                        var $code = $div.find('code');

                        $code.trigger('dblclick');
                        document.execCommand('copy');

                        toast.show('复制成功', function () {
                            $code.trigger('blur');
                        });
                    },
                });
            }

            if (code.line) {
                panel.$on('click', {
                    //点击行，高亮。
                    '[data-cmd="line"]': function (event) {
                        $(this).toggleClass('on');
                    },
                });
            }

           


            panel.$bind('code', {
                //双击进入可编辑模式。
                'dblclick': function (event) {
                    //先删除每行用来包裹的 `p` 标签，否则会多出很多空行，不正确。
                    var list = $(this).find('p').toArray().map(function (p) {
                        return p.innerHTML;
                    });

                    this.innerHTML = list.join('\n')


                    this.setAttribute('contenteditable', true);
                    this.focus();

                    //全选内容。
                    selectAll(this);
                },

                //失焦退出编辑模式，并且应用最新的内容。
                'blur': function (event) {
                    var content = this.innerText;
                    var language = this.dataset.language;
                    var div = this.parentNode.parentNode;

                    var html = exports.fill({
                        'tpl': tpl,
                        'content': content,
                        'language': language,
                        'format': code.format,
                        'foldable': code.foldable,
                        'type': code.type,
                        'copy': code.copy,
                    });

                    div.outerHTML = html;

                },

                //代码区进入可编辑模式时，监听内容的输入，以便调整高度和重新生成行号。
                'input': function (event) {
                    var content = this.innerText; //重新获取。
                    var $pre = $(this.parentNode);
                    var $div = $(this.parentNode.parentNode);
                    var info = Lines.parse(content);

                    $pre.css({
                        'height': info.height,
                        'margin-left': info.width,
                    });

                    //指定了要生成行号，则根据内容重新生成行号。
                    if (code.numbers) {
                        var html = tpl.fill('code', 'numbers', info);
                        $div.find('[data-id="line-numbers"]').html(html);
                    }

                },
            });


            
        },





        /**
        *
        *   opt = {
        *       tpl: Template,      //
        *       content: '',
        *       language: '',
        *       format: true,       //
        *   };
        */
        fill: function (opt) {
            var content = opt.content;
            var language = opt.language;
            var tpl = opt.tpl;

            if (opt.format && language == 'json') {
                content = JSON.format(content);
            }

            content = Highlight.render(language, content);


            var html = tpl.fill('code', {
                'content': content,
                'language': language,
            });

            return html;
        },


       


        



        
        
    };
    
});


