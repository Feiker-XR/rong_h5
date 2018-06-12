<ul id="sideNav" class="nav nav-side-menu">
    <li class="shadow-layer"></li>
    {{~it:item:index}}
        {{?index==0}}
        <li>
            <a {{?false}}target="_blank"{{?}} href="{{=$$r.hosts}}/photon{{=RKC.mainSuffix}}">
                <i class="icon-photon {{=item.class}} main-dash"></i>
                <span class="nav-selection">首页</span>
            </a>
        </li>
        {{?}}
        <li>
            <a {{?item.isOpenNew}}target="_blank"{{?}} href="{{=!!item.uri?item.uri:"javascript:;"}}" >
                <i class="icon-photon {{=item.class}}"></i>
                <span class="nav-selection">{{=item.name}}</span>
                {{?item.children && item.children.length}}<i class="icon-menu-arrow"></i>{{?}}
            </a>
            {{?item.children && item.children.length}}
                <div class="sub-nav">
                    <ul class="nav">
                    {{~item.children:child1}}
                    <li>
                        <a {{?child1.isOpenNew}}target="_blank"{{?}} href="{{=child1.uri}}">{{=child1.name}}</a>
                        {{?child1.children && child1.children.length}}<i class="icon-menu-arrow"></i>{{?}}
                        {{?child1.children && child1.children.length}}
                            <div class="sub-nav">
                                <ul class="nav">
                                    {{~child1.children:child2}}
                                        <li>
                                            <a {{?child2.isOpenNew}}target="_blank"{{?}} href="{{=child2.uri}}">{{=child2.name}}</a>
                                            {{?child2.children && child2.children.length}}<i class="icon-menu-arrow"></i>{{?}}
                                            {{?child2.children && child2.children.length}}
                                                <div class="sub-nav">
                                                    <ul class="nav">
                                                        {{~child2.children:child3}}
                                                            <li>
                                                                <a {{?child3.isOpenNew}}target="_blank"{{?}} href="{{=child3.uri}}">{{=child3.name}}</a>
                                                            </li>
                                                        {{~}}
                                                    </ul>
                                                </div>
                                            {{?}}
                                        </li>
                                    {{~}}
                                </ul>
                            </div>
                        {{?}}
                    </li>
                    {{~}}
                    </ul>
                </div>
            {{?}}
        </li>
    {{~}}
    <li class="nav-logout">
        <a href="javascript:;" data-op="logout">
            <i class="icon-photon loger_out"></i><span class="nav-selection">注销</span>
        </a>
    </li>
</ul>