##商品价格策略列表 GetPriceList
获取商品价格策略。


用途：查看购物车时，获取购物车里各商品的价格策略。

**参数：**

名称 |  描述
------| ------
`productIds` | 商品id（商品列表的id，数组）eg:"productIds":["999","dsjhfdlasj"]
`customerId` | 客户id
`empId` | 职员id（用户id）


**返回值：**
``` json
{	
	"普通商品id":{
			"price":"价格",
			"rule":[
				  {
					"min":"数量最小值",
					"max":"数量最大值",
					"price":"商品价格",
					"unitId":"单位id",
					"isLowPrice":"是否最低价控制：1控制，0不控制",
					"lowPrice":"最低限格"				
			   	   }
			]
		},
	"合并商品id":{
			"ruleList": [
                    	{
                        	"id": "商品id",
                        	"price": "商品价格",
                        	"rule": [
                            		{
                              	 	 	"min":"数量最小值",
						"max":"数量最大值",
						"price":"商品价格",
						"unitId":"单位id",
						"isLowPrice":"是否最低价控制：1控制，0不控制",
						"lowPrice":"最低限格"
                            		}
                        	]
                    	}
		]			
	},
	"有辅助属性商品id":{
			"rule":[
				  {
					"min":"数量最小值",
					"max":"数量最大值",
					"price":"商品价格",
					"unitId":"单位id",
					"isLowPrice":"是否最低价控制：1控制，0不控制",
					"lowPrice":"最低限格"				
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
						"price":"商品价格",
						"unitId":"单位id",
						"isLowPrice":"是否最低价控制：1控制，0不控制",
						"lowPrice":"最低限格"
                            		}
                        	]
                    	}
		]			
	}
}
```


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
            "3AB5F9173E604D6395B3B440EB584E66": {
                "ruleList": [                    
                    
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
                    }
                ]

            }
}
```
