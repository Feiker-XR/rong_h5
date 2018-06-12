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
    "hfive_weidian_pay_geturl_response": {
        "url": "<%= data['servUrl'] %>/weMall/mobile/orderFoot"
    }
}

<%}%>