
#用户登录

>请求其它接口之前必须先进行用户登录，以便进行鉴权。

- 接口名称：`User.login`
- 请求方式：`post`


####参数

名称 | 类型 |必填 | 默认值 | 描述
------| -----|-------
`number` | string | 是 |  | 用户的账号。
`password` | string | 是 |  | 用户的密码。



####示例

``` javascript
api.post({
    'number': 'guest',
    'password': '126321ecfaf887845fe3f7bbd786bfc0',
});
```

####返回值
**需要关注的是 `token` 字段，拿到该值后，在后续所有的接口请求中都要在 url 的查询参数里带上。**

```json
{
    "id": "E3E9DFA93FE1",
    "datetime": "2016-12-09 15:15:23",
    "department": "游客",
    "number": "guest",
    "password": "126321ecfaf887845fe3f7bbd786bfc0",
    "name": "张小姐",
    "sex": "女",
    "phone": "",
    "address": "",
    "role": "guest",
    "token": "4F55A24FDAF0"
}
```
