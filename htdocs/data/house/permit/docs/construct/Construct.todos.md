
#获取建设许可的待办列表 

> 从建设许可的待办列表中，获取指定分页的列表数据。

- 接口名称：`Construct.todos`
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
                "license": {
                    "id": "5633E0E7745A",
                    "datetime": "2016-06-14 23:39:57",
                    "planId": "0DADAFACBCB6",
                    "number": "建字第440604201600133号",
                    "numberDesc": "",
                    "name": "",
                    "nameDesc": "",
                    "date": "2016-05-17",
                    "dateDesc": "",
                    "residenceSize": 0,
                    "residenceSizeDesc": "",
                    "commerceSize": 0,
                    "commerceSizeDesc": "",
                    "officeSize": 0,
                    "officeSizeDesc": "",
                    "otherSize": 16.5,
                    "otherSizeDesc": "",
                    "parkSize": 0,
                    "parkSizeDesc": "",
                    "otherSize1": 17.65,
                    "otherSize1Desc": ""
                },
                "plan": {
                    "id": "0DADAFACBCB6",
                    "datetime": "2016-06-14 23:44:42",
                    "landId": "8F834A18B63A",
                    "project": "佛禅网(挂)2013-009领地海纳珑庭",
                    "projectDesc": "",
                    "use": "二类居住用地，可兼容商业商务用地 ",
                    "useDesc": "",
                    "developer": "佛山市禅城区领悦房地产开发有限公司",
                    "developerDesc": ""
                },
                "land": {
                    "id": "8F834A18B63A",
                    "datetime": "2016-06-15 17:24:32",
                    "number": "佛禅网(挂)2013—009",
                    "numberDesc": "",
                    "town": "张槎",
                    "townDesc": "",
                    "location": "南北大涌东侧、轻工路北侧",
                    "locationDesc": "",
                    "size": 36943.01,
                    "sizeDesc": "",
                    "use": "二类居住用地,可兼容商业商务用地",
                    "useDesc": "",
                    "diy": false,
                    "diyDesc": "",
                    "residenceSize": 73886,
                    "residenceSizeDesc": "",
                    "commerceSize": 18472,
                    "commerceSizeDesc": "",
                    "officeSize": 0,
                    "officeSizeDesc": "",
                    "otherSize": 0,
                    "otherSizeDesc": "",
                    "parkSize": 29734,
                    "parkSizeDesc": "",
                    "otherSize1": 0,
                    "otherSize1Desc": "",
                    "winner": "佛山市禅城区领悦房地产开发有限公司",
                    "winnerDesc": "",
                    "price": 39667,
                    "priceDesc": "",
                    "date": "2014-1-21",
                    "dateDesc": "",
                    "contract": "440601-2014-100009",
                    "contractDesc": "",
                    "license": "佛禅国用(2014)第1101226号",
                    "licenseDesc": ""
                }
            },
            
        ],
        "total": 45
    }
}
```
`total` 表示总记录数。