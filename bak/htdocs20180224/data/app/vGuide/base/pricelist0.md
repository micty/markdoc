##商品价格策略列表 GetPriceList
获取商品价格策略。


用途：查看购物车时，获取购物车里各商品的价格策略。

**参数：**

名称 |  描述
------| ------
`productIds` | 商品id（数组）eg:"productIds":["999","dsjhfdlasj"]
`customerId` | 客户id
`empId` | 职员id（用户id）

**商品id及参数productId说明：**

产品类型|主id（商品列表的id）|明细id（商品信息rulelist里的id）|productId
------| ------
`普通商品` |有，商品id|无|主id
`合并商品` |有，合并商品id|有，商品id|明细id
`属性商品` |有，商品id|有，属性id|主id


**返回值：**
``` json
{	
	"商品id1":{
			"price":"价格",
			"rule":[
				  {
					"min":"数量最小值",
					"max":"数量最大值",
					"price":"商品价格"				
			   	   }
			]
		},
	"商品id2":{
			"rule":[
				  {
					"min":"数量最小值",
					"max":"数量最大值",
					"price":"商品价格"				
			   	   }
			],
			"ruleList": [
                    	{
                        	"id": "属性id",
                        	"price": "商品价格",
                        	"rule": [
                            		{
                              	 	 	"min":"数量最小值",
						"max":"数量最大值",
						"price":"商品价格"
                            		}
                        	]
                    	}
		]			
	}
}
```

**返回值说明：**

产品类型|格式（参见上面json）|返回值|记录数
------| ------
`普通商品` |第一个元素|该商品的价格策略|一条记录
`合并商品` |第一个元素|其中的productId对应的那个商品的价格策略|一条记录
`属性商品` |第二个元素|同商品所有属性和商品本身的价格策略|N个属性就有N+1条记录

**返回值例子**


``` json
{
    //type=0
            "999": {
                "price": 100,
                "rule": [
                    {
                        "min": 0,
                        "max": 99,
                        "price": 15,
                    },
                    {
                        "min": 100,
                        "max": 200,
                        "price": 12,
                    },
                ]
            },

            //type=1
            "2000": {
                "price": 100,
                "rule": [
                    {
                        "min": 0,
                        "max": 99,
                        "price": 15,
                    },
                    {
                        "min": 100,
                        "max": 200,
                        "price": 12,
                    },
                ]
            },


            //type=2
            "3000": {
                "rule": [
                    {
                        "min": 0,
                        "max": 10,
                        "price": 20
                    },
                    {
                        "min": 0,
                        "max": 10,
                        "price": 20
                    },
                ],
                "ruleList": [
                    {
                        "id": "10",
                        "price": 100,
                        "rule": [
                            {
                                "min": 0,
                                "max": 0,
                                "price": 0
                            }
                        ]
                    },
                    {
                        "id": "11",
                        "price": 101,
                        "rule": [
                            {
                                "min": 0,
                                "max": 10,
                                "price": 110
                            },
                            {
                                "min": 11,
                                "max": 100,
                                "price": 100
                            }
                        ]
                    },
                    {
                        "id": "12",
                        "price": 101,
                        "rule": [
                            {
                                "min": 0,
                                "max": 0,
                                "price": 0
                            }
                        ]
                    },
                    {
                        "id": "13",
                        "price": 101,
                        "rule": [
                            {
                                "min": 0,
                                "max": 0,
                                "price": 0
                            }
                        ]
                    },
                    {
                        "id": "14",
                        "price": 101,
                        "rule": [
                            {
                                "min": 0,
                                "max": 0,
                                "price": 0
                            }
                        ]
                    }
                ],

            },
}
```
