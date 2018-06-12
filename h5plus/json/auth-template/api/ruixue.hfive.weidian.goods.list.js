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
    "hfive_weidian_goods_list_response": {
        "total": "50",
        "page": "1",
        "page_size": "10",
        "page_total": "50",
        "list": [
            {
                "product_id": 1,
                "name": "商品1",
                "price": 10,
                "image": "http://aaa.bbb.ccc/1.jpg"
            },
            {
                "product_id": 2,
                "name": "商品2",
                "price": 12,
                "image": "http://aaa.bbb.ccc/2.jpg"
            }
        ]
    }
}
<%}%>