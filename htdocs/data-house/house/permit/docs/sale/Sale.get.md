
#获取销售许可详情 


> 获取指定 id 的销售许可记录的详情数据。

- 接口名称：`Sale.get`
- 请求方式：`get`



####参数

名称 | 类型 | 必填 | 默认值 | 描述
---- | ---  | ---- | ------ | ------
`id` | string | 是 |  | 销售许可记录的唯一 id 值。
`token` | string | 是 |  | 登录成功后，后台自动分配到的 token 值。




####示例

``` javascript
api.get({
    'id': '5204BA5AA0E0',
    'token': 'E3FB043D7F0E',
});
```

####返回值
```json

{
    "code": 200,
    "msg": "ok",
    "data": {
        "sale": {
            "id": "5204BA5AA0E0",
            "datetime": "2016-11-15 15:44:46",
            "planId": "C43317C72851",
            "project": "星星广场",
            "projectDesc": ""
        },
        "plan": {
            "id": "C43317C72851",
            "datetime": "2016-06-16 11:06:55",
            "landId": "D63FDA38E324",
            "project": "星星广场项目",
            "projectDesc": "",
            "use": "居住用地，可兼容商业、办公、文化娱乐用地",
            "useDesc": "",
            "developer": "广东星域房地产开发有限公司、广东星之海房地产投资有限公司",
            "developerDesc": ""
        },
        "land": {
            "id": "D63FDA38E324",
            "datetime": "2016-06-20 14:27:14",
            "number": "佛禅(挂)2011—014",
            "numberDesc": "",
            "town": "祖庙",
            "townDesc": "",
            "location": "禅城区季华七路北侧、南海大道东侧",
            "locationDesc": "",
            "size": 81743.67,
            "sizeDesc": "",
            "use": "城镇住宅建筑及其配套设施、商业办公、文华娱乐建筑及其配套设施",
            "useDesc": "",
            "diy": false,
            "diyDesc": "",
            "residenceSize": 129865.06,
            "residenceSizeDesc": "",
            "commerceSize": 157932.66,
            "commerceSizeDesc": "",
            "officeSize": 0,
            "officeSizeDesc": "",
            "otherSize": 0,
            "otherSizeDesc": "",
            "parkSize": 92536,
            "parkSizeDesc": "",
            "otherSize1": 0,
            "otherSize1Desc": "",
            "winner": "广东星城房地产开发有限公司",
            "winnerDesc": "",
            "price": 57295.9,
            "priceDesc": "",
            "date": "2011-8-1",
            "dateDesc": "",
            "contract": "440601-2011-100072",
            "contractDesc": "",
            "license": "佛禅国用(2012)第1200668号|佛禅国用(2012)第1200669号",
            "licenseDesc": ""
        }
    }
}

```
