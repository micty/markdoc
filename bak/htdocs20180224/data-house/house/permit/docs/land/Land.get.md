
#获取土地出让详情 

> 获取指定 id 的土地出让记录的详情数据。

- 接口名称：`Land.get`
- 请求方式：`get`



####参数

名称 | 类型 |必填 | 默认值 | 描述
------| -----|-------
`id` | string | 是 |  | 土地出让记录的唯一 id 值。
`token` | string | 是 |  | 登录成功后，后台自动分配到的 token 值。




####示例

``` javascript
api.get({
    'id': 'EA35F26A5262',
    'token': 'E3FB043D7F0E',
});
```

####返回值
```json
{
    "code": 200,
    "msg": "ok",
    "data": {
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
}

```
