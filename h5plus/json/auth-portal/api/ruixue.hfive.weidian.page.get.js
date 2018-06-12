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
        "page_name": "微店页面",
        "order": "10",
        "page_info": [
            {
              "page_name": "最爱吃",
              "order": "22",
              "page_info": "[{\"id\":\"300\",\"name\":\"女士衬衣\",\"price\":\"98.00\",\"image\":\"http://resource.h5plus.net/2016/03/28/56f89db74773e.png\",\"url\":\"http://172.16.13.180:1221/weMall/mobile/details?id=300\",\"type\":\"goods\",\"style\":\"0\"},{\"type\":\"txt\",\"style\":0,\"name\":\"都是你爱吃的\"}]"
            }
        ]
    }
}
<%}%>

