

#获取施工许可证详情 

> 获取指定 id 的施工许可证的详情数据。
 
- 接口名称：`Construct.get`
- 请求方式：`get`


####参数

名称 | 类型 | 必填 | 默认值 | 描述
---- | ---  | ---- | ------ | ------
`id` | string | 是 |  | 施工许可证记录的唯一 id 值。
`token` | string | 是 |  | 登录成功后，后台自动分配到的 token 值。




####示例

``` javascript
api.get({
    'id': 'id:CD56D1ADAB27',
    'token': 'E3FB043D7F0E',
});
```




####返回值
```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "construct": {
            "id": "CD56D1ADAB27",
            "datetime": "2016-06-27 10:22:22",
            "licenseId": "2897D8E7D0DB",
            "number": "4406012014112801",
            "numberDesc": "{construct.numberDesc}",
            "date": "2014-11-28",
            "dateDesc": "{construct.dateDesc}",
            "size": 7932.28,
            "sizeDesc": "{construct.sizeDesc}"
        },
        "license": {
            "id": "2897D8E7D0DB",
            "datetime": "2016-06-15 17:07:49",
            "planId": "0DADAFACBCB6",
            "number": "建字第440604201400266 号",
            "numberDesc": "",
            "name": "",
            "nameDesc": "",
            "date": "2014-08-15",
            "dateDesc": "",
            "residenceSize": 4699.36,
            "residenceSizeDesc": "",
            "commerceSize": 1862.36,
            "commerceSizeDesc": "",
            "officeSize": 0,
            "officeSizeDesc": "",
            "otherSize": 182.21,
            "otherSizeDesc": "",
            "parkSize": 0,
            "parkSizeDesc": "",
            "otherSize1": 350.51,
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
    }
}

```
