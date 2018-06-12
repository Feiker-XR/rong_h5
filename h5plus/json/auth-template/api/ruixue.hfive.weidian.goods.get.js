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
    "hfive_weidian_goods_get_response": [
        {
            "id": 1,
            "name": "商品11",
            "price": 67,
            "url": "http://weidian.h5plus.net/wap/good.php?id=1",
            "intro" : "中国四分之三的苹果从这里买中国四分之三的苹果从这里买",
            "image": "<%=data['res']%>/h5plus/img/weMall/mobile/fruits.jpg"
        },
        {
            "id": 2,
            "name": "商品11",
            "price": 6789,
            "url": "http://weidian.h5plus.net/wap/good.php?id=1",
            "intro" : "中国四分之三的苹果从这",
            "image": "<%=data['res']%>/h5plus/img/weMall/mobile/mimi.jpg"
        },
        {
            "id": 3,
            "name": "商品11",
            "price": 789,
            "url": "http://weidian.h5plus.net/wap/good.php?id=1",
            "intro" : "中国四分之三的苹果从这里买",
            "image": "<%=data['res']%>/h5plus/img/weMall/mobile/fruits.jpg"
        },
        {
            "id": 4,
            "name": "商品11",
            "price": 66,
            "url": "http://weidian.h5plus.net/wap/good.php?id=1",
            "intro" : "中国四分之三的苹果从这之三的苹果从这里买",
            "image": "<%=data['res']%>/h5plus/img/weMall/mobile/mimi.jpg"
        },
        {
            "id": 5,
            "name": "商品12",
            "price": 99,
            "url": "http://weidian.h5plus.net/wap/good.php?id=1",
            "intro" : "中国四分之三的苹果从这里买中国四分之三买",
            "image": "<%=data['res']%>/h5plus/img/weMall/mobile/mimi.jpg"
        },
        {
            "id": 6,
            "name": "商品12",
            "price": 110,
            "url": "http://weidian.h5plus.net/wap/good.php?id=1",
            "intro" : "中国四分之三的苹果从这里买中国四分之三买",
            "image": "<%=data['res']%>/h5plus/img/weMall/mobile/fruits.jpg"
        },
        {
            "id": 7,
            "name": "商品12",
            "price": 33,
            "url": "http://weidian.h5plus.net/wap/good.php?id=1",
            "intro" : "中国四分之三的苹果从这里买中国四分之三买",
            "image": "<%=data['res']%>/h5plus/img/weMall/mobile/mimi.jpg"
        }
    ]
}
<%}%>