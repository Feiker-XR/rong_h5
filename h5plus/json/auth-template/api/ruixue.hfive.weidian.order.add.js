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
    "hfive_weidian_order_add_response": {
        "order_id": 125,
        "order_no": "20150729164221221849"
    }
}

<%}%>