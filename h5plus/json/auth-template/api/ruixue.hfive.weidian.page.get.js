<% if(data.post['error_test']){ %>
{
    "error_response": {
        "code": "SH5PXXXXXX0001",
        "host" : "<%= data['res'] %>",
        "msg": "接口名称错误"
    }
}
<% }else{ %>
{
    "hfive_weidian_page_get_response": {
        "page_name": "微店页面A",
        "order": "10",
        "page_info": [
            {
                "type": "ads",
                "id": 12,
                "adlist": [
                    {
                        "id": 1230,
                        "url": "details",
                        "image": "<%= data['res'] %>/h5plus/img/weMall/mobile/fruit.png"
                    },
                    {
                        "id": 456,
                        "url": "details",
                        "image": "<%= data['res'] %>/h5plus/img/weMall/mobile/fruit2.jpg"
                    },
                    {
                        "id": 890,
                        "url": "details",
                        "image": "<%= data['res'] %>/h5plus/img/weMall/mobile/pic3.jpg"
                    },
                    {
                        "id": 678,
                        "url": "details",
                        "image": "<%= data['res'] %>/h5plus/img/weMall/mobile/banners.jpg"
                    }
                ]
            },
            {
                "type": "goods",
                "id": 132,
                "style": 0,
                "name": "一般陈列商品",
                "intro": "中国四分之三的苹果从这里买啊",
                "price": "12.25",
                "url": "http://weidian.h5plus.net/wap/good.php?id=132",
                "image": "http://weidian.h5plus.net/upload/images/first_demo_goods.jpg"
            },
            {
                "type": "txt",
                "id": 122,
                "style": 0,
                "name": "- 每天888款 限量秒杀 - "
            },
            {
                "type": "group",
                "id": 221,
                "name": "组团购商品",
                "price": "32.89",
                "intro": "组团购商品便宜卖了啊",
                "staff": 56,
                "url": "http://weidian.h5plus.net/wap/good.php?id=132",
                "image": "http://weidian.h5plus.net/upload/images/n_demo_goods.jpg"
            },
            {
                "type": "goods",
                "id": 123,
                "style": 1,
                "salenum" : 1577,
                "name": "特殊陈列商品",
                "intro": "中国四分之三的苹果从这里买",
                "price": "12.25",
                "price_old": "18.88",
                "url": "http://weidian.h5plus.net/wap/good.php?id=132",
                "image": "<%= data['res'] %>/h5plus/img/weMall/mobile/pic3.jpg"
            },
            {
                "type": "goods",
                "id": 132,
                "style": 0,
                "name": "一般陈列商品",
                "intro": "中国四分之三的苹果从这里买啊",
                "price": "12.25",
                "url": "http://weidian.h5plus.net/wap/good.php?id=132",
                "image": "http://weidian.h5plus.net/upload/images/first_demo_goods.jpg"
            },
            {
                "type": "goods",
                "id": 123,
                "style": 1,
                "salenum" : 1577,
                "name": "特殊陈列商品",
                "intro": "中国四分之三的苹果从这里买",
                "price": "12.25",
                "price_old": "18.88",
                "url": "http://weidian.h5plus.net/wap/good.php?id=132",
                "image": "<%= data['res'] %>/h5plus/img/weMall/mobile/fruit.png"
            },
            {
                "type": "txt",
                "id": 122,
                "style": 0,
                "name": "- 每个插入各种测试 限量抢购 - "
            },
            {
                "type": "group",
                "id": 221,
                "name": "组团购商品",
                "price": "32.89",
                "intro": "组团购商品便宜卖了啊",
                "staff": 56,
                "url": "http://weidian.h5plus.net/wap/good.php?id=132",
                "image": "http://weidian.h5plus.net/upload/images/n_demo_goods.jpg"
            }
        ]
    }
}
<%}%>