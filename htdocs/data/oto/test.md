
#####1、如果是云产品新购，格式为：

`order_type: 2`

``` json
[{"yun_name":"云进销存","accounts":"10","price":"1000.00"}] 

```

#####2、如果是包加站，格式为：
`order_type: 3`

```json
[{"product_name":"金蝶专业包","station":"10","price":"1000.00"}] 
```

#####3、如果是专业版加站加模，格式为：

`order_type: 3`

```json
    [
        {"product_name":"金蝶专业版15.0","module_name":"采购管理","station":"10","price":"1000.00","module_type" : 1},{"product_name":"金蝶专业版15.0","module_name":"仓存管理","station":"9","price":"952.00","module_type" : 2},]
```
其中，module_type如果为1那么就是单纯加站，为2则表明是加站加模，新购 

#####4、服务产品续费，格式为：

`order_type: 4`

``` json
[{"sevice_name":"云进销存","price":"1000.00"}]
```