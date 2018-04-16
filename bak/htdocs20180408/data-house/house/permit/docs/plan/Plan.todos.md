
#获取规划管理的待办列表 

> 从规划管理的待办列表中，获取指定分页的列表数据。

- 接口名称：`Plan.todos`
- 请求方式：`post`


####参数

名称 | 类型 | 必填 | 默认值 | 描述
---- | ---  | ---- | ------ | ------
`keyword` | string |  |  | 搜索的关键词。
`pageNo` | number | 是 | 1 | 分页的页码数字，从 `1` 开始。
`pageSize` | number | 是 | 10 | 分页的大小，即每页的记录数。





####示例

``` javascript
api.post({
    'keyword': '',
    'pageNo': 1,
    'pageSize': 10,
});
```

####返回值
```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "list": [
            {
                "id": "637A0D45C696",
                "datetime": "2016-06-16 15:35:38",
                "number": "协议出让",
                "numberDesc": "",
                "town": "石湾",
                "townDesc": "",
                "location": "江湾二路34号",
                "locationDesc": "",
                "size": 46560.07,
                "sizeDesc": "",
                "use": "二类居住用地，商业、文华设施用地，商业商务娱乐康体用地",
                "useDesc": "",
                "diy": false,
                "diyDesc": "",
                "residenceSize": 34820,
                "residenceSizeDesc": "",
                "commerceSize": 158194,
                "commerceSizeDesc": "",
                "officeSize": 0,
                "officeSizeDesc": "",
                "otherSize": 0,
                "otherSizeDesc": "",
                "parkSize": 67298,
                "parkSizeDesc": "",
                "otherSize1": 0,
                "otherSize1Desc": "",
                "winner": "佛山市君辉投资有限公司",
                "winnerDesc": "",
                "price": 25841.76,
                "priceDesc": "",
                "date": "2015-12-24",
                "dateDesc": "",
                "contract": "440601-2015-100071",
                "contractDesc": "",
                "license": "06000916274|佛禅国用(2015)第1021141号",
                "licenseDesc": ""
            }
        ],
        "total": 20
    }
}
```
`total` 表示总记录数。