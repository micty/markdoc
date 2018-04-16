
#获取规划许可详情

> 获取指定 id 的规划许可记录的详情数据。

- 接口名称：`Plan.get`
- 请求方式：`get`


####参数

名称 | 类型 | 必填 | 默认值 | 描述
---- | ---  | ---- | ------ | ------
`id` | string | 是 |  | 规划许可记录的唯一 id 值。
`token` | string | 是 |  | 登录成功后，后台自动分配到的 token 值。




####示例

``` javascript
api.get({
    'id': '0DADAFACBCB6',
    'token': 'E3FB043D7F0E',
});
```

####返回值
```json
{
    "code": 200,
    "msg": "ok",
    "data": {
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
        }
    }
}

```
