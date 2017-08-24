

#获取规划许可证详情

> 获取指定 id 的规划许可证的详情数据。

- 接口名称：`PlanLicense.get`
- 请求方式：`get`


####参数

名称 | 类型 | 必填 | 默认值 | 描述
---- | ---  | ---- | ------ | ------
`id` | string | 是 |  | 规划许可证记录的唯一 id 值。
`token` | string | 是 |  | 登录成功后，后台自动分配到的 token 值。




####示例

``` javascript

api.get({
    'id': '2897D8E7D0DB',
    'token': 'E3FB043D7F0E',
});

```




####返回值
```json

{
    "code": 200,
    "msg": "ok",
    "data": {
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
    }
}

```
