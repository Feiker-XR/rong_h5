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
    "hfive_weidian_order_list_response": {
        "total": 50,
        "orders": [
            {
                "order_id": 1,
                "store_id": 12,
                "order_no": "20150729164221221849",
                "uid": 31,
                "total": 50,
                "status": 1,
                "add_time": 1438160246,
                "product_list": [
                    {
                        "product_id": 1,
                        "name": "fruits",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/fruits.jpg"
                    },
                    {
                        "product_id": 2,
                        "name": "mimi",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/mimi.jpg"
                    },
                    {
                        "product_id": 3,
                        "name": "fruits",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/fruits.jpg"
                    },
                    {
                        "product_id": 4,
                        "name": "mimi",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/mimi.jpg"
                    },
                    {
                        "product_id": 5,
                        "name": "fruits",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/fruits.jpg"
                    },
                    {
                        "product_id": 6,
                        "name": "mimi",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/mimi.jpg"
                    },
                    {
                        "product_id": 7,
                        "name": "fruits",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/fruits.jpg"
                    },
                    {
                        "product_id": 8,
                        "name": "mimi",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/mimi.jpg"
                    },
                    {
                        "product_id": 9,
                        "name": "mimi",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/mimi.jpg"
                    },
                    {
                        "product_id": 10,
                        "name": "fruits",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/fruits.jpg"
                    }
                ]
            },
            {
                "order_id": 2,
                "store_id": 12,
                "order_no": "234523523452345345345",
                "uid": 42,
                "total": 100,
                "status": 3,
                "add_time": 1438160246,
                "product_list": [
                    {
                        "product_id": 31,
                        "name": "fruits",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/fruits.jpg"
                    },
                    {
                        "product_id": 55,
                        "name": "fruits",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/fruits.jpg"
                    },
                    {
                        "product_id": 46,
                        "name": "mimi",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/mimi.jpg"
                    },
                    {
                        "product_id": 37,
                        "name": "fruits",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/fruits.jpg"
                    },
                    {
                        "product_id": 67,
                        "name": "mimi",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/mimi.jpg"
                    },
                    {
                        "product_id": 27,
                        "name": "fruits",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/fruits.jpg"
                    },
                    {
                        "product_id": 78,
                        "name": "mimi",
                        "image": "<%=data['res']%>/h5plus/img/weMall/mobile/mimi.jpg"
                    }
                ]
            }
        ]
    }
}
<%}%>