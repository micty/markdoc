
#获取已售记录详情

> 获取指定 id 的已售记录的详情数据。


- 接口名称：`Saled.get`
- 请求方式：`get`


####参数

名称 | 类型 | 必填 | 默认值 | 描述
---- | ---  | ---- | ------ | ------
`id` | string | 是 |  | 已售记录的唯一 id 值。
`token` | string | 是 |  | 登录成功后，后台自动分配到的 token 值。





####示例

``` javascript
api.get({
    'id': '1A5395E25C90',
    'token': 'E3FB043D7F0E',
});
```

####返回值
```json

{"code":200,"msg":"ok","data":{"license":{"id":"B6598F60E648","datetime":"2016-11-15 15:44:46","saleId":"5204BA5AA0E0","type":0,"number":"2014010301","numberDesc":"","date":"2014-11-13","dateDesc":"","location":"禅城区星辰路10号八座","locationDesc":"","residenceSize":10759.32,"residenceSizeDesc":"","commerceSize":0,"commerceSizeDesc":"","officeSize":0,"officeSizeDesc":"","otherSize":0,"otherSizeDesc":"","parkSize":0,"parkSizeDesc":"","otherSize1":0,"otherSize1Desc":"","residenceCell":120,"residenceCellDesc":"","commerceCell":0,"commerceCellDesc":"","officeCell":0,"officeCellDesc":"","otherCell":0,"otherCellDesc":""},"saled":{"id":"1A5395E25C90","datetime":"2017-03-02 09:57:41","licenseId":"B6598F60E648","date":20170301,"dateDesc":"","residenceSize":10748.92,"residenceSizeDesc":"","commerceSize":0,"commerceSizeDesc":"","officeSize":0,"officeSizeDesc":"","otherSize":0,"otherSizeDesc":"","parkSize":0,"parkSizeDesc":"","otherSize1":0,"otherSize1Desc":"","residenceCell":120,"residenceCellDesc":"","commerceCell":0,"commerceCellDesc":"","officeCell":0,"officeCellDesc":"","otherCell":0,"otherCellDesc":""}}}

```
