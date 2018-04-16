

#获取预售许可证或现售备案列表 

> 获取指定 id 的销售许可记录所关联的预售许可证或现售备案列表。

- 接口名称：`SaleLicense.list`
- 请求方式：`get`


####参数

名称 | 类型 | 必填 | 默认值 | 描述
---- | ---  | ---- | ------ | ------
`saleId` | string | 是 |  | 销售许可记录的唯一 id 值。
`token` | string | 是 |  | 登录成功后，后台自动分配到的 token 值。




####示例

``` javascript
api.get({
    'saleId': '5204BA5AA0E0',
    'token': 'E3FB043D7F0E',
});
```




####返回值

`license` 字段中的 `type` 字段：
- `0` 表示预售许可证; 
- `1` 表示现售备案

```json

{
    "code": 200,
    "msg": "ok",
    "data": [
        {
            "license": {
                "id": "B6598F60E648",
                "datetime": "2016-11-15 15:44:46",
                "saleId": "5204BA5AA0E0",
                "type": 0,
                "number": "2014010301",
                "numberDesc": "",
                "date": "2014-11-13",
                "dateDesc": "",
                "location": "禅城区星辰路10号八座",
                "locationDesc": "",
                "residenceSize": 10759.32,
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
            "saleds": [
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
                }
            ]
        },
        
    ]
}

```
