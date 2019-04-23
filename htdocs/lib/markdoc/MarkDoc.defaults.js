
/**
* MarkDoc 的默认配置。
*/
define('MarkDoc.defaults', {
    /**
    * 标题区域。
    */
    titles: {
        selector: 'h1,h2,h3,h4,h5,h6',
        foldable: true,                 //允许折叠。
    },

    /**
    * 代码区域。
    */
    code: {
        format: true,   //是否自动格式化（针对 JSON）。
        language: true, //是否显示语言类型标签。
        numbers: true,  //是否显示行号。
        foldable: true, //是否允许通过点击语言类型标签来折叠和展开代码区。 须在 language 为 true 才生效。
    },


    replace: {
        '<li>[ ] ': '<li class="todo-list-item"> <i class="far fa-square"></i>',
        '<li>[#] ': '<li class="todo-list-item"> <i class="fas fa-check-square"></i>',
        '<li>[x] ': '<li class="todo-list-item"> <i class="fas fa-check-square"></i>',
    },


});
