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
    "hfive_weidian_order_get_response": {
        "store_id": 2,
        "order_id": 2,
        "status_str": "等待卖家发货",
        "express_company": "物流公司",
        "express_no": "p21345677",
        "order_no": "20151020144846295841",
        "create_time": "1457512517",
        "address_id": "2",
        "address": "辽宁省 大连市 西岗区 XX大厦",
        "address_user": "谭某某",
        "address_tel": "13578989898",
        "sub_total": 100,
        "postage": "5",
        "total": "105",
        "product_list": [
            {
                "product_id": 123,
                "type": 1,
                "demo": 0,
                "description": "越南红肉火龙果越南红肉火龙果",
                "name": "越南红肉火龙果",
                "pro_num": 5,
                "pro_price": 7.8
            },
            {
                "product_id": 345,
                "type": 2,
                "demo": 1,
                "description": "越南红肉火龙果2火龙果2火龙果2",
                "name": "红肉火龙果果",
                "pro_num": 32,
                "pro_price": 15.66
            }
        ]
    }
}
<%}%>