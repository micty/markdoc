
#获取销售管理的待办列表

> 从销售许可的待办列表中，获取指定分页的列表数据。

- 接口名称：`Sale.todos`
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
                "plan": {
                    "id": "55DD8C79F13F",
                    "datetime": "2016-06-13 16:36:52",
                    "landId": "8E37E9F62131",
                    "project": "",
                    "projectDesc": "",
                    "use": "二类居住用地，可兼容商业商务用地",
                    "useDesc": "",
                    "developer": "",
                    "developerDesc": ""
                },
                "land": {
                    "id": "8E37E9F62131",
                    "datetime": "2016-06-24 17:34:52",
                    "number": "协议出让",
                    "numberDesc": "",
                    "town": "石湾",
                    "townDesc": "",
                    "location": "文华路西侧、深村大道南侧(地块二)",
                    "locationDesc": "",
                    "size": 21719.69,
                    "sizeDesc": "",
                    "use": "住宅，商业",
                    "useDesc": "",
                    "diy": false,
                    "diyDesc": "",
                    "residenceSize": 76714.31,
                    "residenceSizeDesc": "",
                    "commerceSize": 4054.63,
                    "commerceSizeDesc": "",
                    "officeSize": 0,
                    "officeSizeDesc": "",
                    "otherSize": 0,
                    "otherSizeDesc": "",
                    "parkSize": 23944.11,
                    "parkSizeDesc": "",
                    "otherSize1": 0,
                    "otherSize1Desc": "",
                    "winner": "佛山市禅城区石湾镇街道深村股份合作经济联合社",
                    "winnerDesc": "",
                    "price": 12424,
                    "priceDesc": "",
                    "date": "2015-12-11",
                    "dateDesc": "",
                    "contract": "440601-2015-100048",
                    "contractDesc": "",
                    "license": "",
                    "licenseDesc": "未发证"
                }
            },
            
        ],
        "total": 43
    }
}
```
`total` 表示总记录数。