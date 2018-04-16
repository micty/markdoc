
#获取已售记录列表

> 获取指定 id 的预售许可证(现售备案)所关联的已售记录列表。


- 接口名称：`Saled.list`
- 请求方式：`get`


####参数

名称 | 类型 | 必填 | 默认值 | 描述
---- | ---  | ---- | ------ | ------
`licenseId` | string | 是 |  | 预售许可证(现售备案)记录的唯一 id 值。
`token` | string | 是 |  | 登录成功后，后台自动分配到的 token 值。





####示例

``` javascript
api.get({
    'licenseId': 'B6598F60E648',
    'token': 'E3FB043D7F0E',
});
```

####返回值
```json

{
    "code": 200,
    "msg": "ok",
    "data": [
        {
            "id": "CC0E54B33625",
            "datetime": "2016-11-15 15:48:33",
            "licenseId": "B6598F60E648",
            "date": 20161115,
            "dateDesc": "",
            "residenceSize": 10748.92,
            "residenceSizeDesc": "",
            "commerceSize": 0,
            "commerceSizeDesc": "",
            "officeSize": 0,
            "officeSizeDesc": "",
            "otherSize": 0,
            "otherSizeDesc": "",
            "parkSize": 0,
            "parkSizeDesc": "",
            "otherSize1": 0,
            "otherSize1Desc": "",
            "residenceCell": 120,
            "residenceCellDesc": "",
            "commerceCell": 0,
            "commerceCellDesc": "",
            "officeCell": 0,
            "officeCellDesc": "",
            "otherCell": 0,
            "otherCellDesc": ""
        },
        
    ]
}
```
