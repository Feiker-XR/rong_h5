<% if(data.post['error_test']){ %>
{
    "error_response": {
        "code": "SH5PXXXXXX0001",
        "host" : "<%= data['res'] %>",
        "msg": "错误的店铺id或绑定的微信id"
    }
}
<% }else{ %>
{
    "hfive_weidian_common_getstorewxinfo_response": {
        "store_id": 15,
        "wx_id": "gh_12345678"
    }
}
<%}%>