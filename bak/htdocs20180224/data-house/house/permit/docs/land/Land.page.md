
#获取土地出让列表

> 从土地出让列表中，获取指定分页的列表数据。

- 接口名称：`Land.page`
- 请求方式：`post`


####参数

名称 | 类型 | 必填 | 默认值 | 描述
---- | ---  | ---- | ------ | ------
`keyword` | string |  |  | 搜索的关键词。
`pageNo` | number | 是 | 1 | 分页的页码数字，从 `1` 开始。
`pageSize` | number | 是 | 10 | 分页的大小，即每页的记录数。
`town` | string |  |  | 要搜索过滤的镇街，如`南庄`。如果不指定则获取全部镇街。





####示例

``` javascript
api.post({
    'keyword': '',
    'pageNo': 1,
    'pageSize': 10,
    'town': '南庄',
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
                "id": "EA35F26A5262",
                "datetime": "2016-06-16 16:53:40",
                "number": "TD2015(CC)WG002",
                "numberDesc": "",
                "town": "祖庙",
                "townDesc": "",
                "location": "市东路东侧、佛平路北侧",
                "locationDesc": "",
                "size": 33972.87,
                "sizeDesc": "",
                "use": "二类居住用地，商业商务、娱乐康体、文化设施用地",
                "useDesc": "",
                "diy": false,
                "diyDesc": "",
                "residenceSize": 68759,
                "residenceSizeDesc": "",
                "commerceSize": 102335,
                "commerceSizeDesc": "",
                "officeSize": 0,
                "officeSizeDesc": "",
                "otherSize": 0,
                "otherSizeDesc": "",
                "parkSize": 48773,
                "parkSizeDesc": "",
                "otherSize1": 0,
                "otherSize1Desc": "",
                "winner": "广州东辉房地产开发有限公司、广州越秀仁达八号实业投资合伙企业(有限合伙)",
                "winnerDesc": "",
                "price": 63305,
                "priceDesc": "",
                "date": "2015-2-5",
                "dateDesc": "",
                "contract": "440601-2015-100011",
                "contractDesc": "",
                "license": "佛禅国用(2015)第1208380号",
                "licenseDesc": ""
            }
        ],
        "total": 168
    }
}
```
`total` 表示总记录数。