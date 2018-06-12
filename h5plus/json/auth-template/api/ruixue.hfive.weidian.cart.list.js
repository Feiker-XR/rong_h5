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
    "hfive_weidian_cart_list_response": {
        "total": "50",
        "list": [
            {
                "pro_id": 12,
                "pro_name": "品味男士",
                "pro_image": "images/000/000/002/201507/55b1b4c499acb.jpg",
                "sku_id": 56,
                "sku_data": [
                    {
                        "pid": 9,
                        "name": "产地",
                        "vid": 1893,
                        "value": "中国"
                    },
                    {
                        "pid": 9,
                        "name": "产地",
                        "vid": 1893,
                        "value": "中国"
                    }
                ],
                "pro_num": 1,
                "pro_price": 10.00,
                "quantity": 100
            },
            {
                "pro_id": 12,
                "pro_name": "品味男士",
                "pro_image": "images/000/000/002/201507/55b1b4c499acb.jpg",
                "sku_id": 56,
                "sku_data": [
                    {
                        "pid": 9,
                        "name": "产地",
                        "vid": 1893,
                        "value": "中国"
                    },
                    {
                        "pid": 9,
                        "name": "产地",
                        "vid": 1893,
                        "value": "中国"
                    }
                ],
                "pro_num": 1,
                "pro_price": 10.00,
                "quantity": 100
            }
        ]
    }
}
<%}%>