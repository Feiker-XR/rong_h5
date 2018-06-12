<% if(data.post['error_test']){ %>
{
    "error_response": {
        "code": "SH5PXXXXXX0001",
        "host" : "<%= data['res'] %>",
        "msg": "错误的商品"
    }
}
<% }else{ %>
{
    "hfive_weidian_goods_getdetail_response": {
        "id": 1,
        "store_id": 1,
        "name": "商品A",
        "price": 100,
        "original_price": 120,
        "min_price": 80,
        "max_price": 235,
        "quantity": 500,
        "intro": "商品简介",
        "info": "商品描述:浓浓的南洋风味 口感香甜多汁 含丰富的维生素和水溶性膳食纤维",
        "detail": "美食有一层境界就是看上去和原来差不多，但其实内部结构已经彻底改变，而火龙果也能用同样的方法简单制作出来。先把火龙果肉取出，然后加奶少许薄荷和寒天粉凝结后再到回火龙果中去，然后用椰浆浸泡几个小时，使椰香渗透其中之后就可以享用了。",
        "images": [
            {
                "image": "<%= data['res'] %>/h5plus/img/weMall/mobile/mimi.jpg"
            },
            {
                "image": "<%= data['res'] %>/h5plus/img/weMall/mobile/banner.jpg"
            },
            {
                "image": "<%= data['res'] %>/h5plus/img/weMall/mobile/mimi.jpg"
            },
            {
                "image": "<%= data['res'] %>/h5plus/img/weMall/mobile/banner.jpg"
            }
        ],
        "attributes": [
            {
                "attribute": "属性1"
            },
            {
                "attribute": "属性2"
            }
        ],
        "properties": [
            {
                "name": "规格1",
                "values": ["橡胶味","苹果味"]
            },
            {
                "name": "规格2",
                "values": ["鸡蛋味"]
            }
        ],
        "properties_for_select": [
            {
                "pid": 1,
                "name": "规格1",
                "values": [
                    {
                        "vid": 1,
                        "value": "规格1值1"
                    },
                    {
                        "vid": 2,
                        "value": "规格1值2"
                    }
                ]
            },
            {
                "pid": 2,
                "name": "规格2",
                "values": [
                    {
                        "vid": 1,
                        "value": "规格1值1"
                    },
                    {
                        "vid": 2,
                        "value": "规格1值2"
                    }
                ]
            }
        ],
        "stocks": {
            "1:1;2:1": {
                "quantity": 100,
                "price": 100
            },
            "1:2;2:2": {
                "quantity": 200,
                "price": 200
            }
        }
    }
}
<%}%>