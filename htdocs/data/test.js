

//填充。
function format(sample, item) {
    var html = sample;
    Object.keys(item).forEach(function (key) {
        var value = item[key];
        var tag = '{' + key + '}';

        //实现字符串的全局替换。
        html = html.split(tag).join(value);
    });

    return html;
}


function fill(sample, list) {
    
    list = list.map(function (item, index) {
        return format(sample, item);
    });

    return list.join('');

}

var sample = 'hi, {name}, you are {age} years old，{test}!! \r\n';
var users = [
	{ id: '1000', name: '张三', age: 30, isMale: true, },
	{ id: '1001', name: '李四', age: 35, isMale: true, },
    { id: '1002', name: '王丽', age: 20, isMale: false, },
];

var html = fill(sample, users);
console.log(html);



var sample =
    '<table>' +
        '<tr>' +
            '<td>{id}</td>' + 
            '<td>{name}</td>' + 
            '<td>{age}</td>' + 
        '</tr>' +
    '</table>';