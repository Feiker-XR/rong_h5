
![h5plus-logo](http://h5plus.net/portal/singleLogin/login/themes/h5plus/images/logo.png) 
# H5PLUS企业后台管理说前端说明文档

------


**前端h5plus项目svn地址：**  
[https://rush.ruixuesoft.com:8443/svn/fengnian/fengnian-template/trunk/h5plus-solution](https://rush.ruixuesoft.com:8443/svn/fengnian/fengnian-template/trunk/h5plus-solution)

**产品原型及文档**（之后补充说明， 项目原型有一一对应地址）；

**UI组源图svn地址：**  
[https://rush.ruixuesoft.com:8443/svn/fengnian/fengnian-template/trunk/h5plus-ui ](https://rush.ruixuesoft.com:8443/svn/fengnian/fengnian-template/trunk/h5plus-ui )

**默认主题：**  
[http://photonui.orangehilldev.com/](http://photonui.orangehilldev.com/) 

部门力南这边已经购买admin主题photon， 之后h5plus新项目主要引用此主题样式作为默认项目开发；  
默认主题的UI已成型，UI组会设计logo和具体业务需要的icon等，没有过多设计；  
如果有新风格的主题（UI组重新整体设计、公司购买或开源的后台主题模板 eg：ace、模板之家），会配置开发为可自定义动态切换的主题及模板；  
默认主题和其它主题源码会放置切图原型目录 proto；  

**部署步骤：**  
1. 安装nodejs；  
2. win下启动根目录nodejs.bat；  
3. 访问本地 [http://localhost:1221/](http://localhost:1221/)  (默认index.html，会部署为photon默认风格）  

**项目创建步骤说明：**  
[https://rush.ruixuesoft.com:8443/svn/fengnian/fengnian-template/trunk/h5plus-solution/doc/add_project/add_project.html](https://rush.ruixuesoft.com:8443/svn/fengnian/fengnian-template/trunk/h5plus-solution/doc/add_project/add_project.html)  
或   
[http://test.h5plus.net/fe/doc/add_project/add_project.html](http://test.h5plus.net/fe/doc/add_project/add_project.html)

**包加载参考：**  
[http://seajs.org/docs/ ](http://seajs.org/docs/ )

**前端模板引擎：**  
[http://olado.github.io/doT/index.html ](http://olado.github.io/doT/index.html )

**业务开发：**  
html：*js模板*  
css：*less                                             （移动：css3、媒体查询）*  
js：*seajs + js模式 + jquery1.11.1        ( 移动：zepto等）*  
左导航菜单目录：*\h5plus-solution\h5plus\json\site\showtree.js*  
模拟数据接口目录：*\h5plus-solution\h5plus\json*   
**前后端接口：**  *\h5plus-solution\h5plus\view\{项目目录名}*  
**--源码--**  
库目录：*\h5plus-solution\res\src\comlibjs\lib*  
组件：*\h5plus-solution\res\src\comlibjs\module*  
第三方：*\h5plus-solution\res\src\comlibjs\third*  
样式目录：*\h5plus-solution\res\src\h5plus\css*  
图片目录：*\h5plus-solution\res\src\h5plus\img*  
逻辑及模板目录：*\h5plus-solution\res\src\h5plus\js*  
切图原型目录：*\h5plus-solution\res\src\h5plus\proto*  

**组件：**  
自定义、bootstrap、jquery第三方等，需做包加载依赖；

**开发语言：**  
html5、js1.6+、css3

**平台适配：**
chrome、safari、firefox、opera、ie9+；   
移动端：ios、安卓、pad




**h5plus**目前前端已经在h5plus-solution环境熟悉和启动重构的项目：  
公众号管理 》自定义菜单     -高倩  
二维码管理 》静态二维码     -陈俊芳  
微应用 》 我的页面              -韩充满  



---


[@zhaoxiaoyang]     
2016 年 02月 16日    



