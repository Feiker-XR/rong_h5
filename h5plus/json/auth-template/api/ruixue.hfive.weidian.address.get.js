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
    "hfive_weidian_address_get_response": {
        "address_id": 1,
        "uid": 1,
        "name": "我是收货人",
        "tel": "13591756969",
        "province": 1,
        "city": 1,
        "area": 1,
        "address": "胡同甲二号",
        "zipcode": "116000"
    }
}
<%}%>