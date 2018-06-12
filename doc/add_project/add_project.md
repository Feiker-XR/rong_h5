![h5plus-logo](http://h5plus.net/portal/singleLogin/login/themes/h5plus/images/logo.png) 
# 如何添加一个H5plus的新项目

------

这里介绍在自定义的h5plus平台下，怎样快速添加一个新的工程项目模块，类似eclipse或.net的新建项目工程模板，目前只支持sublime text 3,后期可以移植到nodejs，或bat、shell等桌面命令行等快速创建。

> * 目前在是h5plus平台为主目录架构，如有其它新平台，创建后需要另行配置node和config信息等
> * 创建的目录遵循mvc规范
> * m为直接的h5plus目录，数据接口为json目录，前后端web接口配置目录为view目录
> * v为<font color="#ff0000">`(resource/source)` res/src/h5plus/css、img、js/*.html</font>目录下的样式、图片及html模板文件等
> * c为<font color="#ff0000">res/src/h5plus/js/*.js</font>目录下对应js

#创建流程动画演示
![创建流程动画演示](./h5plus_add_pro.gif)

------

#目录配置信息
```Java
 h5plus/json(                                                               /**** 模拟数据目录 ****/
                subscriptionManage/getlist.js                               //获取列表接口
                subscriptionManage/saveadd.js                               //保存接口
                subscriptionManage/delete.js                                //删除接口
                subscriptionManage/getedit.js                               //编辑页接口
                subscriptionManage/saveedit.js                              //保存编辑页接口
            )
            h5plus/view(                                                    /**** 前后端web接口配置目录 ****/
                subscriptionManage/list.html                                //列表页web配置
                subscriptionManage/detail.html                              //详情页web配置
            )
            res/src/h5plus/css/subscriptionManage/subscriptionManage.less   /**** 样式源文件(less) ****/
            res/src/h5plus/proto/subscriptionManage/                        /**** 切图原型文件(html+css+img) ****/
            res/src/h5plus/js(                                              /**** html模板及js业务逻辑目录 ****/
                subscriptionManage/list.html                                //列表页模板
                subscriptionManage/list.js                                  //列表页逻辑
                subscriptionManage/detail.html                              //详情页模板
                subscriptionManage/detail.js                                //详情页逻辑
            )
```

------

#目录结构
```Shell
h5plus-solution                                                             /平台
├─config                                                                    //配置信息
├─h5plus                                                                    ///数据功能目录
│  ├─json                                                                   ////模拟数据目录
│  │  ├─auth-portal                                                         /////模拟接口目录(粉丝等通用接口目录和文件)
│  │  │  └─api
│  │  ├─site
│  │  └─subscriptionManage                                                  /////模拟接口(公共管理业务)
│  ├─node_modules                                                           ////node配置
│  └─view                                                                   ////view 前后端web接口
│      ├─fans                                                               /////粉丝web主页
│      │  └─manage
│      ├─subscriptionManage                                                 /////公共平台管理web主页
│      └─_g
└─res                                                                       //cdn目录
    ├─node_modules
    ├─online                                                                ///上线目录
    ├─qa                                                                    ///测试目录
    ├─src                                                                   ///源代码目录
    │  ├─comlibjs                                                           ////公共库
    │  │  ├─lib
    │  │  ├─module                                                          ///组件库(UI,数据)
    │  │  └─third                                                           ///第三方库
    │  │      └─bootstrap
    │  ├─h5plus                                                             ///源代码目录 -
    │  │  ├─css                                                             ///(对应业务项目的css、js、html、切图等)
    │  │  │  ├─g
    │  │  │  ├─common
    │  │  │  ├─fans
    │  │  │  └─subscriptionManage
    │  │  ├─img
    │  │  │  └─g
    │  │  ├─js
    │  │  │  ├─_g
    │  │  │  ├─common
    │  │  │  ├─fans                                                                   
    │  │  │  │  └─manage
    │  │  │  └─subscriptionManage
    │  │  │  
    │  │  └─proto                                                             ///切图目录
    │  │      └─subscriptionManage
    │  └─rkui
    └─_tool
```


---


[@zhaoxiaoyang]     
2016 年 01月 14日    

语法参考[markdown]。

[markdown]: http://sspai.com/25137


