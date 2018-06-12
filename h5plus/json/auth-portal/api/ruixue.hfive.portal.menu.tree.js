    {
        "errno": 10000,
        "error": "error",
        "config": [
            "/subscriptionManage/customMenu/list",
            "/qrcode/manage/list",
            "/fans/manage/list",
            "http://weidian.h5plus.net/user.php?c=store&a=select",
            "/microapp/manage/mypage",
            "http://system.minisite.h5plus.net/working/FTP1263/system/learning1/index.html"
        ],
        "data": [
            {
                "name": "公众号管理",
                "class":"home",
                "open": false,
                "uri": "",
                "children": [{
                    "name": "公众号授权",
                    "id": "j_tree_1_00",
                    "uri": "/subscriptionManage/authorization/authorization",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "自定义菜单",
                    "id": "j_tree_1_01",
                    "uri": "/subscriptionManage/customMenu/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "自动应答",
                    "id": "j_tree_1_02",
                    "uri": "/subscriptionManage/autoResponse/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "数字菜单",
                    "id": "j_tree_1_03",
                    "uri": "/digiMenu/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "素材管理",
                    "id": "j_tree_1_04",
                    "uri": "",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": false,
                    "children":[{
                        "name": "图文素材",
                        "id": "j_tree_1_041",
                        "uri": "/subscriptionManage/material/imageText/imageTextList",
                        "checked": true,
                        "jurisdiction": 1,
                        "open": true
                    }
                    ,{
                        "name": "图片",
                        "id": "j_tree_1_042",
                        "uri": "/subscriptionManage/material/upPic/upPic",
                        "checked": true,
                        "jurisdiction": 1,
                        "open": true
                    }
                    ,{
                        "name": "文本",
                        "id": "j_tree_1_043",
                        "uri": "/texture/txt/list",
                        "checked": true,
                        "jurisdiction": 1,
                        "open": true
                    }
                    ,{
                        "name": "语音",
                        "id": "j_tree_1_044",
                        "uri": "/subscriptionManage/material/upAudios/upAudios",
                        "checked": true,
                        "jurisdiction": 1,
                        "open": true
                    }
                    ,{
                        "name": "视频",
                        "id": "j_tree_1_045",
                        "uri": "/subscriptionManage/material/video/video",
                        "checked": true,
                        "jurisdiction": 1,
                        "open": true
                    }]
                }
                ]
            },
            {
                "name": "模板消息管理",
                "class":"list_nested",
                "open": false,
                "uri": "",
                "children": [{
                    "name": "自定义模板消息",
                    "id": "j_tree_1_05",
                    "uri": "/tempMsg/custom/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }]
            }
            ,{
                "name": "二维码管理",
                "class":"chart_alt",
                "open": false,
                "uri": "",
                "children": [{
                        "name": "二维码分类",
                        "id": "j_tree_1_061",
                        "uri": "/qrcode/classify/list",
                        "checked": true,
                        "jurisdiction": 1,
                        "open": true
                    }
                    ,{
                        "name": "静态二维码",
                        "id": "j_tree_1_062",
                        "uri": "/qrcode/manage/list",
                        "checked": true,
                        "jurisdiction": 1,
                        "open": true
                    }
                    ,{
                        "name": "动态二维码",
                        "id": "j_tree_1_063",
                        "uri": "/qrcode/dynamic/list",
                        "checked": true,
                        "jurisdiction": 1,
                        "open": true
                    }
                    ,{
                        "name": "微信二维码",
                        "id": "j_tree_1_064",
                        "uri": "/qrcode/wechat/list",
                        "checked": true,
                        "jurisdiction": 1,
                        "open": true
                    }
                    ,{
                        "name": "微信参数管理",
                        "id": "j_tree_1_062",
                        "uri": "/qrcode/wechatConf/list",
                        "checked": true,
                        "jurisdiction": 1,
                        "open": true
                    }]
            }
            ,{
                "name": "微信广播",
                "class":"book_alt2",
                "open": false,
                "uri": "",
                "children": [{
                    "name": "微信广播",
                    "id": "j_tree_1_07",
                    "uri": "/wechatBroadcast/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }]
            }
            ,{
                "name": "活动管理",
                "class":"book_alt3",
                "open": false,
                "uri": "",
                "children": [{
                    "name": "签名",
                    "id": "j_tree_1_08",
                    "uri": "/active/sign/index",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                },
                {
                    "name": "签到后台及配置",
                    "id": "j_tree_1_09",
                    "uri": "/active/signBackend/signBackend",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }]
            }
            ,{
                "name": "粉丝标签",
                "class":"hash",
                "open": false,
                "uri": "",
                "children": [{
                    "name": "粉丝管理",
                    "id": "j_tree_1_081",
                    "uri": "/fans/manage/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "粉丝画像",
                    "id": "j_tree_1_082",
                    "uri": "/fans/portrait/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "48小时活跃粉丝",
                    "id": "j_tree_1_083",
                    "uri": "/fans/active48/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "标签管理",
                    "id": "j_tree_1_084",
                    "uri": "/label/manage/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "标签分析",
                    "id": "j_tree_1_085",
                    "uri": "/label/analysis/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }]
            }
            ,{
                "name": "微信多客服",
                "class":"new_window",
                "open": false,
                "uri": "",
                "children": [{
                    "name": "多客服管理",
                    "id": "j_tree_1_09",
                    "uri": "/wechatService/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }]
            }
            ,{
                "name": "微商城",
                "class":"map_pin_stroke",
                "open": false,
                "uri": "",
                "children": [
                    {
                        "name": "微店铺",
                        "id": "j_tree_1_10",
                        "uri": "http://weidian.h5plus.net/user.php?c=store&a=select",
                        "checked": true,
                        "jurisdiction": 1,
                        "open": false,
                        "children": [
                            {
                                "name": "首页",
                                "id": "j_tree_1_101",
                                "uri": "/weMall/mobile/home",
                                "checked": true,
                                "jurisdiction": 1,
                                "open": true
                            }
                            ,{
                                "name": "组团购",
                                "id": "j_tree_1_102",
                                "uri": "/weMall/mobile/group",
                                "checked": true,
                                "jurisdiction": 1,
                                "open": true
                            }
                            ,{
                                "name": "购物车",
                                "id": "j_tree_1_103",
                                "uri": "/weMall/mobile/cart",
                                "checked": true,
                                "jurisdiction": 1,
                                "open": true
                            }
                            ,{
                                "name": "个人中心",
                                "id": "j_tree_1_104",
                                "uri": "/weMall/mobile/ucenter",
                                "checked": true,
                                "jurisdiction": 1,
                                "open": true
                            }
                        ]
                    }
                    ,{
                        "name": "货架管理",
                        "id": "j_tree_1_11",
                        "uri": "",
                        "checked": true,
                        "jurisdiction": 1,
                        "open": false,
                        "children": [
                            {
                                "name": "选择模板",
                                "id": "j_tree_1_101",
                                "uri": "/weMall/shelf/selectTemp",
                                "checked": true,
                                "jurisdiction": 1,
                                "open": true
                            }
                            ,{
                                "name": "一般页面",
                                "id": "j_tree_1_102",
                                "uri": "/weMall/shelf/common/list",
                                "checked": true,
                                "jurisdiction": 1,
                                "open": true
                            }
                            ,{
                                "name": "特殊页面",
                                "id": "j_tree_1_103",
                                "uri": "/weMall/shelf/special/list",
                                "checked": true,
                                "jurisdiction": 1,
                                "open": true
                            }
                            ,{
                                "name": "模板设置",
                                "id": "j_tree_1_104",
                                "uri": "/weMall/shelf/configTemp",
                                "checked": true,
                                "jurisdiction": 1,
                                "open": true
                            }
                        ]
                    }
                    ,{
                        "name": "订单管理",
                        "id": "j_tree_1_12",
                        "uri": "weMall/order/order",
             			"checked": true,
                    	"jurisdiction": 1,
                    	"open": true
                    }
                    ,{
                        "name": "团购",
                        "id": "j_tree_1_11",
                        "uri": "",
                        "checked": true,
                        "jurisdiction": 1,
                        "open": false,
                        "children": [
                            {
                                "name": "团购移动端",
                                "id": "j_tree_1_101",
                                "uri": "",
                                "checked": true,
                                "jurisdiction": 1,
                                "open": false,
                                "children": [
                                    {
                                        "name": "组团购",
                                        "id": "j_tree_1_102",
                                        "uri": "/weMall/mobile/group/gropuon_activity",
                                        "checked": true,
                                        "jurisdiction": 1,
                                        "open": true
                                    },{
                                        "name": "限时购",
                                        "id": "j_tree_1_102",
                                        "uri": "/weMall/mobile/group/groupon_list",
                                        "checked": true,
                                        "jurisdiction": 1,
                                        "open": true
                                    }
                                ]
                            },
                            {
                                "name": "团购管理",
                                "id": "j_tree_1_101",
                                "uri": "/weMall/shelf/selectTemp",
                                "checked": true,
                                "jurisdiction": 1,
                                "open": false,
                                "children": [
                                    {
                                        "name": "组团购",
                                        "id": "j_tree_1_102",
                                        "uri": "/weMall/shelf/common/list",
                                        "checked": true,
                                        "jurisdiction": 1,
                                        "open": true
                                    },{
                                        "name": "限时购",
                                        "id": "j_tree_1_102",
                                        "uri": "/weMall/shelf/common/list",
                                        "checked": true,
                                        "jurisdiction": 1,
                                        "open": true
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
            ,{
                "name": "微社区",
                "class":"book_alt",
                "open": false,
                "uri": "",
                "children": [{
                	"name": "社区会员",
                    "id": "j_tree_1_111",
                    "uri": "/wechatBBS/list/member",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                },{
                    "name": "话题/专题管理",
                    "id": "j_tree_1_112",
                    "uri": "/wechatBBS/list/community",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }]
            }
            ,{
                "name": "微应用",
                "class":"bolt",
                "open": false,
                "uri": "",
                "children": [{
                    "name": "我的页面",
                    "id": "j_tree_1_121",
                    "uri": "/microapp/list/mypage",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "模板市场",
                    "id": "j_tree_1_122",
                    "uri": "/weApp/tempMarket/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "我的模板",
                    "id": "j_tree_1_123",
                    "uri": "/weApp/myTemp/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "刮刮卡",
                    "id": "j_tree_1_124",
                    "uri": "/weApp/scratchCard/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "砸金蛋",
                    "id": "j_tree_1_125",
                    "uri": "/weApp/goldEgg/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "幸运大转盘",
                    "id": "j_tree_1_126",
                    "uri": "/weApp/luckyWheel/list",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }]
            }
            ,{
            "name": "页面托管服务",
            "class":"info",
            "open": false,
            "uri": "",
            "children":[{
                    "name": "项目开发",
                    "id": "j_tree_1_131",
                    "uri": "/delegate/projectDev",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "学习中心",
                    "id": "j_tree_1_132",
                    "uri": "http://system.minisite.h5plus.net/working/FTP1263/system/learning1/index.html",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "项目运营",
                    "id": "j_tree_1_133",
                    "uri": "/delegate/projectOp",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }
                ,{
                    "name": "开发者设置",
                    "id": "j_tree_1_134",
                    "uri": "/delegate/devConfig",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }]
            }
            ,{
            "name": "系统设置",
            "class":"key_stroke",
            "open": false,
            "uri": "",
            "children":[{
                    "name": "微信支付",
                    "id": "j_tree_1_141",
                    "uri": "/sysConfig/wechatPay",
                    "checked": true,
                    "jurisdiction": 1,
                    "open": true
                }]
            }
        ]
    }