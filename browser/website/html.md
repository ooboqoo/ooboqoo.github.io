# 静态页面


## 京东页面分析

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf8" version='1'/>
        <title>京东(JD.COM)-正品低价、品质保障、配送及时、轻松购物！</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>
        <meta name="description" content="京东JD.COM-专业的综合网上购物商城,销售家电、数码通讯、电脑、家居百货、服装服饰、母婴、图书、食品等数万个品牌优质商品.便捷、诚信的服务，为您提供愉悦的网上购物体验!"/>
        <meta name="Keywords" content="网上购物,网上商城,手机,笔记本,电脑,MP3,CD,VCD,DV,相机,数码,配件,手表,存储卡,京东"/>
        <script type="text/javascript">
            window.point = {}
            window.point.start = new Date().getTime()
        </script>
        <link rel="dns-prefetch" href="//static.360buyimg.com"/>
        <link rel="dns-prefetch" href="//misc.360buyimg.com"/>
        <link rel="dns-prefetch" href="//img10.360buyimg.com"/>
        <link rel="dns-prefetch" href="//img11.360buyimg.com"/>
        <link rel="dns-prefetch" href="//img12.360buyimg.com"/>
        <link rel="dns-prefetch" href="//img13.360buyimg.com"/>
        <link rel="dns-prefetch" href="//img14.360buyimg.com"/>
        <link rel="dns-prefetch" href="//img20.360buyimg.com"/>
        <link rel="dns-prefetch" href="//img30.360buyimg.com"/>
        <link rel="dns-prefetch" href="//d.3.cn"/>
        <link rel="dns-prefetch" href="//d.jd.com"/>
        <link rel="icon" href="//www.jd.com/favicon.ico" mce_href="//www.jd.com/favicon.ico" type="image/x-icon"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="renderer" content="webkit"/>
        <!--[if lte IE 6]>
    <script src="//misc.360buyimg.com/mtd/pc/index/home/ie6tip.min.js"></script>
    <![endif]-->
        <!--[if IE 8]>
    <script src="//misc.360buyimg.com/mtd/pc/index_2019/1.0.0/static/lib/polyfill/index.js"></script>
    <![endif]-->
        <link href="//misc.360buyimg.com/mtd/pc/index_2019/1.0.0/static/css/first-screen.chunk.css" rel="stylesheet"/>
        <link href="//misc.360buyimg.com/mtd/pc/index_2019/1.0.0/static/css/index.chunk.css" rel="stylesheet"/>
        <script type="text/javascript">
            window.point.css = new Date().getTime()
        </script>
        <script type="text/javascript">
            window.pageConfig = {};

        </script>
        <script type="text/javascript">
            !function(e) {
                pageConfig.isWide = function() {
                    var n = e
                      , i = document
                      , o = i.documentElement
                      , t = i.getElementsByTagName("body")[0]
                      , a = n.innerWidth || o.clientWidth || t.clientWidth;
                    return a >= 1370
                }();
                var n = [];
                pageConfig.isWide ? (n.push("root61"),
                n.push("o2_wide")) : n.push("o2_mini");
                var i = document.getElementsByTagName("html")[0];
                i.className = n.join(" ")
            }(window, void 0);
        </script>
        <script type="text/javascript">
            !function(n) {
                function o(n) {
                    for (var o = n + "=", t = document.cookie.split(";"), e = 0; e < t.length; e++) {
                        for (var i = t[e]; " " == i.charAt(0); )
                            i = i.substring(1, i.length);
                        if (0 == i.indexOf(o))
                            return i.substring(o.length, i.length)
                    }
                    return null
                }

                var t = o("pcm")
                  , e = n.navigator.userAgent.toLocaleLowerCase()
                  , i = "//m.jd.com"
                  , r = /iphone|android|symbianos|windows\sphone/g
                  , c = /micromessenger|qq\/[\d.]+/i;
                return c.test(e) ? (n.location.href = "//wqs.jd.com/?from=jdindex",
                !1) : r.test(e) && "1" != t ? (n.location.href = i,
                !1) : void 0
            }(window);
        </script>
        <script type="text/javascript">
            window.search = function(a) {
                var b, c = "//search.jd.com/Search?keyword={keyword}&enc={enc}{additional}";
                var d = search.additinal || "";
                var e = document.getElementById(a);
                var f = e.value;
                if (f = f.replace(/^\s*(.*?)\s*$/, "$1"),
                f.length > 100 && (f = f.substring(0, 100)),
                "" == f)
                    return void (window.location.href = window.location.href);
                var g = 0;
                "undefined" != typeof window.pageConfig && "undefined" != typeof window.pageConfig.searchType && (g = window.pageConfig.searchType);
                var h = "&cid{level}={cid}";
                var i = "string" == typeof search.cid ? search.cid : "";
                var j = "string" == typeof search.cLevel ? search.cLevel : "";
                var k = "string" == typeof search.ev_val ? search.ev_val : "";
                switch (g) {
                case 0:
                    break;
                case 1:
                    j = "-1",
                    d += "&book=y";
                    break;
                case 2:
                    j = "-1",
                    d += "&mvd=music";
                    break;
                case 3:
                    j = "-1",
                    d += "&mvd=movie";
                    break;
                case 4:
                    j = "-1",
                    d += "&mvd=education";
                    break;
                case 5:
                    var l = "&other_filters=%3Bcid1%2CL{cid1}M{cid1}[cid2]";
                    switch (j) {
                    case "51":
                        h = l.replace(/\[cid2]/, ""),
                        h = h.replace(/\{cid1}/g, "5272");
                        break;
                    case "52":
                        h = l.replace(/\{cid1}/g, "5272"),
                        h = h.replace(/\[cid2]/, "%3Bcid2%2CL{cid}M{cid}");
                        break;
                    case "61":
                        h = l.replace(/\[cid2]/, ""),
                        h = h.replace(/\{cid1}/g, "5273");
                        break;
                    case "62":
                        h = l.replace(/\{cid1}/g, "5273"),
                        h = h.replace(/\[cid2]/, "%3Bcid2%2CL{cid}M{cid}");
                        break;
                    case "71":
                        h = l.replace(/\[cid2]/, ""),
                        h = h.replace(/\{cid1}/g, "5274");
                        break;
                    case "72":
                        h = l.replace(/\{cid1}/g, "5274"),
                        h = h.replace(/\[cid2]/, "%3Bcid2%2CL{cid}M{cid}");
                        break;
                    case "81":
                        h = l.replace(/\[cid2]/, ""),
                        h = h.replace(/\{cid1}/g, "5275");
                        break;
                    case "82":
                        h = l.replace(/\{cid1}/g, "5275"),
                        h = h.replace(/\[cid2]/, "%3Bcid2%2CL{cid}M{cid}")
                    }
                    c = "//search-e.jd.com/searchDigitalBook?ajaxSearch=0&enc=utf-8&key={keyword}&page=1{additional}";
                    break;
                case 6:
                    j = "-1",
                    c = "//music.jd.com/8_0_desc_0_0_1_15.html?key={keyword}";
                    break;
                case 7:
                    c = "//s-e.jd.com/Search?key={keyword}&enc=utf-8";
                    break;
                case 8:
                    c = "//search.jd.hk/Search?keyword={keyword}&enc=utf-8";
                    break;
                case 9:
                    d += "&market=1"
                }
                if ("string" == typeof i && "" != i && "string" == typeof j) {
                    var m = /^(?:[1-8])?([1-3])$/;
                    j = "-1" == j ? "" : m.test(j) ? RegExp.$1 : "";
                    var n = h.replace(/\{level}/, j);
                    n = n.replace(/\{cid}/g, i),
                    d += n
                }
                if ("string" == typeof k && "" != k && (d += "&ev=" + k),
                f = encodeURIComponent(f),
                b = c.replace(/\{keyword}/, f),
                b = b.replace(/\{enc}/, "utf-8"),
                b = b.replace(/\{additional}/, d),
                "object" == typeof $o && ("string" == typeof $o.lastKeyword && (b += "&wq=" + encodeURIComponent($o.lastKeyword)),
                "string" == typeof $o.pvid && (b += "&pvid=" + $o.pvid)),
                b.indexOf("/search.jd.com/") > 0)
                    try {
                        JA.tracker.ngloader("search.000009", {
                            key: f,
                            posid: a,
                            target: b
                        })
                    } catch (o) {}
                ("undefined" == typeof search.isSubmitted || 0 == search.isSubmitted) && (setTimeout(function() {
                    window.location.href = b
                }, 50),
                search.isSubmitted = !0)
            }
            ;
        </script>
    </head>
    <body class="index">
        <div class="mod_container">
            <!--无障碍占位-->
            <div id="J_accessibility"></div>
            <!--顶通占位 -->
            <div id="J_promotional-top"></div>
            <div id="shortcut">
                <div class="w">
                    <ul class="fl" clstag="h|keycount|head|topbar_01">
                        <li class="dropdown" id="ttbar-mycity"></li>
                    </ul>
                    <ul class="fr">
                        <li class="fore1 dropdown" id="ttbar-login" clstag="h|keycount|head|topbar_02">
                            <a target="_blank" href="javascript:login();" class="link-login">你好，请登录</a>
                            &nbsp;&nbsp;<a href="javascript:regist();" class="link-regist style-red">免费注册</a>
                        </li>
                        <li class="spacer"></li>
                        <li class="fore2" clstag="h|keycount|head|topbar_03">
                            <div class="dt">
                                <a target="_blank" href="//order.jd.com/center/list.action">我的订单</a>
                            </div>
                        </li>
                        <li class="spacer"></li>
                        <li class="fore3 dropdown" id="ttbar-myjd" clstag="h|keycount|head|topbar_04">
                            <div class="dt cw-icon">
                                <a target="_blank" href="//home.jd.com/">我的京东</a>
                                <i class="iconfont">&#xe610;</i>
                                <i class="ci-right">
                                    <s>◇</s>
                                </i>
                            </div>
                            <div class="dd dropdown-layer"></div>
                        </li>
                        <li class="spacer"></li>
                        <li class="fore4" clstag="h|keycount|head|topbar_05">
                            <div class="dt">
                                <a target="_blank" href="//vip.jd.com/">京东会员</a>
                            </div>
                        </li>
                        <li class="spacer"></li>
                        <li class="fore5" clstag="h|keycount|head|topbar_06">
                            <div class="dt">
                                <a target="_blank" href="//b.jd.com/">企业采购</a>
                            </div>
                        </li>
                        <li class="spacer"></li>
                        <li class="fore8 dropdown" id="ttbar-serv" clstag="h|keycount|head|topbar_07">
                            <div class="dt cw-icon">
                                客户服务<i class="iconfont">&#xe610;</i>
                                <i class="ci-right">
                                    <s>◇</s>
                                </i>
                            </div>
                            <div class="dd dropdown-layer"></div>
                        </li>
                        <li class="spacer"></li>
                        <li class="fore9 dropdown" id="ttbar-navs" clstag="h|keycount|head|topbar_08">
                            <div class="dt cw-icon">
                                网站导航<i class="iconfont">&#xe610;</i>
                                <i class="ci-right">
                                    <s>◇</s>
                                </i>
                            </div>
                            <div class="dd dropdown-layer"></div>
                        </li>
                        <li class="spacer"></li>
                        <li class="fore10 mobile" id="J_mobile" clstag="h|keycount|head|topbar_09">
                            <div class="dt mobile_txt">手机京东</div>
                            <div class="mobile_static">
                                <div class="mobile_static_qrcode"></div>
                            </div>
                            <div id='J_mobile_pop' class='mod_loading mobile_pop'></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="header">
                <div class="w">
                    <div id="logo" class="logo">
                        <h1 class="logo_tit">
                            <a href="//www.jd.com" class="logo_tit_lk" clstag="h|keycount|head|logo_01">京东</a>
                        </h1>
                        <h2 class="logo_subtit">京东,多快好省</h2>
                        <div class="logo_extend" clstag="h|keycount|head|logo_02"></div>
                    </div>
                    <div id="search">
                        <div class="search-m">
                            <div class="search_logo">
                                <a href="//www.jd.com" class="search_logo_lk" clstag="h|keycount|head|logo_01" tabindex="-1">京东，多快好省</a>
                            </div>
                            <div class="form" role="serachbox">
                                <ul id="shelper" class="search-helper" style="display: none"></ul>
                                <input clstag="h|keycount|head|search_c" type="text" onkeydown="javascript:if(event.keyCode==13) search('key');" autocomplete="off" id="key" accesskey="s" class="text" aria-label="搜索"/>
                                <button clstag="h|keycount|head|search_a" onclick="search('key');return false;" class="button" aria-label="搜索">
                                    <i class="iconfont">&#xe60b;</i>
                                </button>
                            </div>
                            <div id="settleup" class="dropdown" clstag="h|keycount|head|cart_null">
                                <div class="cw-icon">
                                    <i class="iconfont">&#xe60c;</i>
                                    <a target="_blank" href="//cart.jd.com/cart.action">我的购物车</a>
                                    <i class="ci-count" id="shopping-amount"></i>
                                </div>
                                <div class="dropdown-layer">
                                    <div id="J_cart_pop">
                                        <span class="loading"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="hotwords" clstag="h|keycount|head|search_d" role=""></div>
                    <div id="navitems" role="navigation">
                        <div class="spacer"></div>
                        <ul id="navitems-group1">
                            <li clstag="h|keycount|head|navi_01" class="fore1">
                                <a class="navitems-lk" target="_blank" href="https://miaosha.jd.com/" aria-lable="秒杀">秒杀                                                            </a>
                            </li>
                            <li clstag="h|keycount|head|navi_02" class="fore2">
                                <a class="navitems-lk" target="_blank" href="https://a.jd.com/" aria-lable="优惠券">优惠券                                                            </a>
                            </li>
                            <li clstag="h|keycount|head|navi_03" class="fore3">
                                <a class="navitems-lk" target="_blank" href="https://plus.jd.com/index?flow_system=appicon&flow_entrance=appicon11&flow_channel=pc" aria-lable="PLUS会员">PLUS会员                                                            </a>
                            </li>
                            <li clstag="h|keycount|head|navi_04" class="fore4">
                                <a class="navitems-lk" target="_blank" href="https://red.jd.com/" aria-lable="品牌闪购">品牌闪购                                                            </a>
                            </li>
                        </ul>
                        <div class="spacer"></div>
                        <ul id="navitems-group2">
                            <li clstag="h|keycount|head|navi_05" class="fore5">
                                <a class="navitems-lk" target="_blank" href="https://paimai.jd.com/" aria-lable="拍卖">拍卖                                                            </a>
                            </li>
                            <li clstag="h|keycount|head|navi_06" class="fore6">
                                <a class="navitems-lk" target="_blank" href="https://jiadian.jd.com/" aria-lable="京东家电">京东家电                                                            </a>
                            </li>
                            <li clstag="h|keycount|head|navi_07" class="fore7">
                                <a class="navitems-lk" target="_blank" href="https://chaoshi.jd.com/" aria-lable="京东超市">京东超市                                                            </a>
                            </li>
                            <li clstag="h|keycount|head|navi_08" class="fore8">
                                <a class="navitems-lk" target="_blank" href="https://fresh.jd.com/" aria-lable="京东生鲜">京东生鲜                                                            </a>
                            </li>
                        </ul>
                        <div class="spacer"></div>
                        <ul id="navitems-group3">
                            <li clstag="h|keycount|head|navi_09" class="fore9">
                                <a class="navitems-lk" target="_blank" href="https://www.jd.hk/" aria-lable="京东国际">京东国际                                                            </a>
                            </li>
                            <li clstag="h|keycount|head|navi_10" class="fore10">
                                <a class="navitems-lk" target="_blank" href="https://jr.jd.com/" aria-lable="京东金融">京东金融                                                            </a>
                            </li>
                        </ul>
                        <div class="spacer"></div>
                    </div>
                    <div id="treasure"></div>
                </div>
            </div>
            <div class="fs">
                <div class="grid_c1 fs_inner">
                    <div class="fs_col1">
                        <div id='J_cate' class="cate J_cate" role="navigation" aria-label="左侧导航">
                            <ul class="JS_navCtn cate_menu">
                                <li class="cate_menu_item" data-index="1" clstag="h|keycount|head|category_01a">
                                    <a target="_blank" class="cate_menu_lk" href="//jiadian.jd.com">家用电器</a>
                                </li>
                                <li class="cate_menu_item" data-index="2" clstag="h|keycount|head|category_02a">
                                    <a target="_blank" class="cate_menu_lk" href="//shouji.jd.com&#47;">手机</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//wt.jd.com">运营商</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//shuma.jd.com&#47;">数码</a>
                                </li>
                                <li class="cate_menu_item" data-index="3" clstag="h|keycount|head|category_03a">
                                    <a target="_blank" class="cate_menu_lk" href="//diannao.jd.com&#47;">电脑</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//bg.jd.com">办公</a>
                                </li>
                                <li class="cate_menu_item" data-index="4" clstag="h|keycount|head|category_04a">
                                    <a target="_blank" class="cate_menu_lk" href="//channel.jd.com&#47;home.html">家居</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//channel.jd.com&#47;furniture.html">家具</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//jzjc.jd.com&#47;">家装</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//channel.jd.com&#47;kitchenware.html">厨具</a>
                                </li>
                                <li class="cate_menu_item" data-index="5" clstag="h|keycount|head|category_05a">
                                    <a target="_blank" class="cate_menu_lk" href="//channel.jd.com&#47;1315-1342.html">男装</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//channel.jd.com&#47;1315-1343.html">女装</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//phat.jd.com&#47;10-156.html">童装</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//channel.jd.com&#47;1315-1345.html">内衣</a>
                                </li>
                                <li class="cate_menu_item" data-index="6" clstag="h|keycount|head|category_06a">
                                    <a target="_blank" class="cate_menu_lk" href="//beauty.jd.com&#47;">美妆</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//channel.jd.com&#47;beauty.html">个护清洁</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//channel.jd.com&#47;pet.html">宠物</a>
                                </li>
                                <li class="cate_menu_item" data-index="7" clstag="h|keycount|head|category_07a">
                                    <a target="_blank" class="cate_menu_lk" href="//phat.jd.com&#47;10-184.html">女鞋</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//phat.jd.com&#47;10-183.html">箱包</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//channel.jd.com&#47;watch.html">钟表</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//channel.jd.com&#47;jewellery.html">珠宝</a>
                                </li>
                                <li class="cate_menu_item" data-index="8" clstag="h|keycount|head|category_08a">
                                    <a target="_blank" class="cate_menu_lk" href="//phat.jd.com&#47;10-185.html">男鞋</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//phat.jd.com&#47;10-109.html">运动</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//channel.jd.com&#47;outdoor.html">户外</a>
                                </li>
                                <li class="cate_menu_item" data-index="9" clstag="h|keycount|head|category_09a">
                                    <a target="_blank" class="cate_menu_lk" href="//xinfang.jd.com&#47;">房产</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//car.jd.com&#47;">汽车</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//che.jd.com&#47;">汽车用品</a>
                                </li>
                                <li class="cate_menu_item" data-index="10" clstag="h|keycount|head|category_10a">
                                    <a target="_blank" class="cate_menu_lk" href="//baby.jd.com">母婴</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//toy.jd.com&#47;">玩具乐器</a>
                                </li>
                                <li class="cate_menu_item" data-index="11" clstag="h|keycount|head|category_11a">
                                    <a target="_blank" class="cate_menu_lk" href="//food.jd.com&#47;">食品</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//jiu.jd.com">酒类</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//fresh.jd.com">生鲜</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//china.jd.com">特产</a>
                                </li>
                                <li class="cate_menu_item" data-index="12" clstag="h|keycount|head|category_12a">
                                    <a target="_blank" class="cate_menu_lk" href="//art.jd.com">艺术</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//channel.jd.com&#47;1672-2599.html">礼品鲜花</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//nong.jd.com">农资绿植</a>
                                </li>
                                <li class="cate_menu_item" data-index="13" clstag="h|keycount|head|category_13a">
                                    <a target="_blank" class="cate_menu_lk" href="//health.jd.com">医药保健</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//channel.jd.com&#47;9192-9196.html">计生情趣</a>
                                </li>
                                <li class="cate_menu_item" data-index="14" clstag="h|keycount|head|category_14a">
                                    <a target="_blank" class="cate_menu_lk" href="//book.jd.com&#47;">图书</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//mvd.jd.com&#47;">文娱</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//education.jd.com">教育</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//e.jd.com&#47;ebook.html">电子书</a>
                                </li>
                                <li class="cate_menu_item" data-index="15" clstag="h|keycount|head|category_15a">
                                    <a target="_blank" class="cate_menu_lk" href="//jipiao.jd.com&#47;">机票</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//hotel.jd.com&#47;">酒店</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//trip.jd.com&#47;">旅游</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//ish.jd.com&#47;">生活</a>
                                </li>
                                <li class="cate_menu_item" data-index="16" clstag="h|keycount|head|category_16a">
                                    <a target="_blank" class="cate_menu_lk" href="//licai.jd.com&#47;">理财</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//z.jd.com&#47;">众筹</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//baitiao.jd.com">白条</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//bao.jd.com&#47;">保险</a>
                                </li>
                                <li class="cate_menu_item" data-index="17" clstag="h|keycount|head|category_17a">
                                    <a target="_blank" class="cate_menu_lk" href="//anzhuang.jd.com">安装</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//jdwx.jd.com">维修</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//cleanclean.jd.com">清洗</a>
                                    <span class="cate_menu_line">/</span>
                                    <a target="_blank" class="cate_menu_lk" href="//2.jd.com&#47;">二手</a>
                                </li>
                                <li class="cate_menu_item" data-index="18" clstag="h|keycount|head|category_18a">
                                    <a target="_blank" class="cate_menu_lk" href="//imall.jd.com&#47;">工业品</a>
                                </li>
                            </ul>
                            <div id="J_popCtn" class="JS_popCtn cate_pop mod_loading" style="display: none;"></div>
                        </div>
                    </div>
                    <div class="fs_col2">
                        <div id='J_focus' class="focus">
                            <div class="focus__loading focus__main skeleton-wrapper">
                                <div class="focus-slider">
                                    <div class="focus-item__core skeleton-elementDark mod_lazyload"></div>
                                    <div class="focus-item__recommend">
                                        <div class="recommend-item skeleton-elementDark"></div>
                                        <div class="recommend-item skeleton-elementDark"></div>
                                        <div class="recommend-item skeleton-elementDark"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="J_fs_col3" class="fs_col3">
                        <div id='J_user' class="J_user user mod_loading">
                            <div class="user__loading user_inner">
                                <div class="user_avatar">
                                    <div class="user_avatar_lk skeleton-element"></div>
                                </div>
                                <div class="user_show skeleton-element">
                                    <p></p>
                                    <p></p>
                                </div>
                                <div class="user_profit_placeholder skeleton-element"></div>
                            </div>
                        </div>
                        <div id='J_news' class="news J_news">
                            <div class="news__loading news2">
                                <div class="news_hd">
                                    <div class="news_hd_placeholder skeleton-element"></div>
                                </div>
                                <div class="news_list">
                                    <div class="news_item skeleton-element"></div>
                                    <div class="news_item skeleton-element"></div>
                                    <div class="news_item skeleton-element"></div>
                                    <div class="news_item skeleton-element"></div>
                                </div>
                            </div>
                        </div>
                        <div id="J_service" class="service">
                            <div class="service_entry">
                                <ul class="J_tab_head service_list">
                                    <li class="service_item service_frame mod_tab_head_item">
                                        <a href="//chongzhi.jd.com/" class="service_lk" target="_blank" clstag="h|keycount|head|shortcut_01" aria-label="话费">
                                            <i class="service_ico service_ico_huafei">
                                                <img class="service_ico_img" src="//m.360buyimg.com/babel/jfs/t1/30057/19/14881/720/5cbf064aE187b8361/eed6f6cbf1de3aaa.png"/>
                                                <img class="service_ico_img_hover" src="//m.360buyimg.com/babel/jfs/t1/45423/33/385/778/5cd4f265E442a9342/0aff0a42cece09ee.png"/>
                                            </i>
                                            <span class="service_txt">话费</span>
                                        </a>
                                    </li>
                                    <li class="service_item service_frame mod_tab_head_item">
                                        <a href="//jipiao.jd.com/" class="service_lk" target="_blank" clstag="h|keycount|head|shortcut_02" aria-label="机票">
                                            <i class="service_ico service_ico_jipiao">
                                                <img class="service_ico_img" src="//m.360buyimg.com/babel/jfs/t1/36478/38/5384/2901/5cbf065aEb0c60a12/afb4399323fe3b76.png"/>
                                                <img class="service_ico_img_hover" src="//m.360buyimg.com/babel/jfs/t1/34261/15/10242/3120/5cd4f256E10257aba/8f3f63ae04ff19af.png"/>
                                            </i>
                                            <span class="service_txt">机票</span>
                                        </a>
                                    </li>
                                    <li class="service_item service_frame mod_tab_head_item">
                                        <a href="//hotel.jd.com/" class="service_lk" target="_blank" clstag="h|keycount|head|shortcut_03" aria-label="酒店">
                                            <i class="service_ico service_ico_jiudian">
                                                <img class="service_ico_img" src="//m.360buyimg.com/babel/jfs/t1/31069/34/14642/979/5cbf0665Ec7dc8223/5fee386254dd2ebc.png"/>
                                                <img class="service_ico_img_hover" src="//m.360buyimg.com/babel/jfs/t1/44601/19/915/1039/5cd4f1cfE2e46473c/b61f083872a7a1de.png"/>
                                            </i>
                                            <span class="service_txt">酒店</span>
                                        </a>
                                    </li>
                                    <li class="service_item service_frame service_frame2 mod_tab_head_item" data-row="2">
                                        <a href="//game.jd.com/" class="service_lk" target="_blank" clstag="h|keycount|head|shortcut_04" aria-label="游戏">
                                            <i class="service_ico service_ico_youxi">
                                                <img class="service_ico_img" src="//m.360buyimg.com/babel/jfs/t1/32403/22/14829/3699/5cbf0674E04723693/caa83ce9b881cd24.png"/>
                                                <img class="service_ico_img_hover" src="//m.360buyimg.com/babel/jfs/t1/57520/8/375/4092/5cd4f1d8Ea1266047/1c590322ece537ba.png"/>
                                            </i>
                                            <span class="service_txt">游戏</span>
                                        </a>
                                    </li>
                                    <li class="service_item service_noframe">
                                        <a href="https:&#47;&#47;jiayouka.jd.com&#47;" class="service_lk" target="_blank" clstag="h|keycount|head|shortcut_05" aria-label="加油卡">
                                            <i class="service_ico">
                                                <!-- 常态 icon -->
                                                <img class="service_ico_img" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;104305&#47;33&#47;13082&#47;3048&#47;5e55db8cE3c971d21&#47;4cccb26719b9f41e.png"/>
                                                <!-- hover 态 icon -->
                                                <img class="service_ico_img_hover" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;36002&#47;35&#47;9106&#47;3311&#47;5cd4f1bdE06ff07ed&#47;9570fdd46ecd3a76.png"/>
                                            </i>
                                            <span class="service_txt">加油卡</span>
                                        </a>
                                    </li>
                                    <li class="service_item service_noframe">
                                        <a href="https:&#47;&#47;train.jd.com&#47;" class="service_lk" target="_blank" clstag="h|keycount|head|shortcut_06" aria-label="火车票">
                                            <i class="service_ico">
                                                <!-- 常态 icon -->
                                                <img class="service_ico_img" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;102252&#47;13&#47;13270&#47;1581&#47;5e55dd28Ebf5f936a&#47;0079d005b3eb8af9.png"/>
                                                <!-- hover 态 icon -->
                                                <img class="service_ico_img_hover" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;58891&#47;36&#47;278&#47;1745&#47;5cd4f1e0Ef4cc50a7&#47;f12276b17e5dcf3b.png"/>
                                            </i>
                                            <span class="service_txt">火车票</span>
                                        </a>
                                    </li>
                                    <li class="service_item service_noframe">
                                        <a href="https:&#47;&#47;z.jd.com&#47;sceneIndex.html?from=jrscyn_20162" class="service_lk" target="_blank" clstag="h|keycount|head|shortcut_07" aria-label="众筹">
                                            <i class="service_ico">
                                                <!-- 常态 icon -->
                                                <img class="service_ico_img" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;92304&#47;16&#47;13311&#47;1685&#47;5e55de81Ed60bac6f&#47;068dd0af592d40ee.png"/>
                                                <!-- hover 态 icon -->
                                                <img class="service_ico_img_hover" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;50929&#47;1&#47;374&#47;1847&#47;5cd4f1eaE5daf90db&#47;cebbff76b25dc22e.png"/>
                                            </i>
                                            <span class="service_txt">众筹</span>
                                        </a>
                                    </li>
                                    <li class="service_item service_noframe">
                                        <a href="https:&#47;&#47;licai.jd.com&#47;?from=jrscyn_20161" class="service_lk" target="_blank" clstag="h|keycount|head|shortcut_08" aria-label="理财">
                                            <i class="service_ico">
                                                <!-- 常态 icon -->
                                                <img class="service_ico_img" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;99923&#47;4&#47;13157&#47;3447&#47;5e55db9fEe6f01ecf&#47;63939dde753166d1.png"/>
                                                <!-- hover 态 icon -->
                                                <img class="service_ico_img_hover" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;47544&#47;23&#47;372&#47;3943&#47;5cd4f24eE92fbcf79&#47;4b49b55af25a7bdf.png"/>
                                            </i>
                                            <span class="service_txt">理财</span>
                                        </a>
                                    </li>
                                    <li class="service_item service_noframe">
                                        <a href="https:&#47;&#47;baitiao.jd.com&#47;?from=jrscyn_20160" class="service_lk" target="_blank" clstag="h|keycount|head|shortcut_09" aria-label="白条">
                                            <i class="service_ico">
                                                <!-- 常态 icon -->
                                                <img class="service_ico_img" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;95113&#47;34&#47;13243&#47;1443&#47;5e55dba6E20f122bf&#47;3d0b478a97caa24a.png"/>
                                                <!-- hover 态 icon -->
                                                <img class="service_ico_img_hover" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;39983&#47;24&#47;6834&#47;1596&#47;5cd4f247E8cf89f1e&#47;b8a8418d5418f471.png"/>
                                            </i>
                                            <span class="service_txt">白条</span>
                                        </a>
                                    </li>
                                    <li class="service_item service_noframe">
                                        <a href="https:&#47;&#47;movie.jd.com&#47;index.html" class="service_lk" target="_blank" clstag="h|keycount|head|shortcut_10" aria-label="电影票">
                                            <i class="service_ico">
                                                <!-- 常态 icon -->
                                                <img class="service_ico_img" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;109398&#47;22&#47;7043&#47;3066&#47;5e55dd34E7ab9b078&#47;274b5a5e95586510.png"/>
                                                <!-- hover 态 icon -->
                                                <img class="service_ico_img_hover" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;41106&#47;15&#47;4551&#47;3300&#47;5cd4f1c7E507148c7&#47;90a218f053e903d2.png"/>
                                            </i>
                                            <span class="service_txt">电影票</span>
                                        </a>
                                    </li>
                                    <li class="service_item service_noframe">
                                        <a href="https:&#47;&#47;b.jd.com&#47;" class="service_lk" target="_blank" clstag="h|keycount|head|shortcut_11" aria-label="企业购">
                                            <i class="service_ico">
                                                <!-- 常态 icon -->
                                                <img class="service_ico_img" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;87213&#47;36&#47;13181&#47;826&#47;5e55dbb1E449e65ad&#47;0ed1e76bc725edfd.png"/>
                                                <!-- hover 态 icon -->
                                                <img class="service_ico_img_hover" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;45316&#47;3&#47;388&#47;884&#47;5cd4f25eEea4c67ed&#47;671f7c186c5e9b01.png"/>
                                            </i>
                                            <span class="service_txt">企业购</span>
                                        </a>
                                    </li>
                                    <li class="service_item service_noframe">
                                        <a href="https:&#47;&#47;o.jd.com&#47;market&#47;index.action" class="service_lk" target="_blank" clstag="h|keycount|head|shortcut_12" aria-label="礼品卡">
                                            <i class="service_ico">
                                                <!-- 常态 icon -->
                                                <img class="service_ico_img" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;106645&#47;22&#47;13331&#47;815&#47;5e55dbb9Ee1a04871&#47;a4a758739ea0f183.png"/>
                                                <!-- hover 态 icon -->
                                                <img class="service_ico_img_hover" src="https:&#47;&#47;m.360buyimg.com&#47;babel&#47;jfs&#47;t1&#47;55911&#47;31&#47;402&#47;858&#47;5cd4f23eE6f536460&#47;5da079255c6dfabe.png"/>
                                            </i>
                                            <span class="service_txt">礼品卡</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="J_tab_content service_pop" tabindex="-1" aria-hidden="true">
                                <div class="mod_tab_content_item service_pop_item mod_loading"></div>
                                <div class="mod_tab_content_item service_pop_item mod_loading"></div>
                                <div class="mod_tab_content_item service_pop_item mod_loading"></div>
                                <div class="mod_tab_content_item service_pop_item mod_loading"></div>
                                <a class="J_service_pop_close service_pop_close iconfont" href="javascript:;" tabindex="-1"></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="J_fs_act" class="fs_act"></div>
            </div>
            <!-- CLUB_LINK start seo  -->
            <div style="display:none">
                <a href="https://www.qingzhouip.com/">氢舟</a>
                <a href="//www.jd.com/nrjs/af98b9fb7f178611.html">双卡双待手机哪款好</a>
                <a href="//www.jd.com/phb/zhishi/1afe932ec41f8476.html">8GB手机排行榜</a>
                <a href="//www.jd.com/jxinfo/d9d0db1eb09fac50.html">联想天逸510s 台式机</a>
                <a href="//www.jd.com/zxnews/00e438ca02b0ae2a.html">海尔滚筒式洗衣机</a>
                <a href="//union.jd.com">网络赚钱</a>
                <a href="//www.jd.com/hprm/12259169922114dc5ef82.html">白酒</a>
                <a href="//www.jd.com/cppf/15901c58fb5406380f01f.html">立白洗衣液</a>
                <a href="//www.jd.com/hotitem/167501d880f4101f9815e.html">青少年牙刷</a>
                <a href="//www.jd.com/sptopic/1316b578fe1de22368e4.html">洗面奶</a>
                <a href="//www.jd.com/nrjs/3246ed949ba174ea.html">唐狮拼色 连衣裙</a>
                <a href="//www.jd.com/brand/9987019f0bd7d403e3de.html">苹果手机</a>
                <a href="//www.jd.com/hprm/62331efefe1affa158ff.html">琵琶</a>
                <a href="//www.jd.com/sptopic/117296ca19d46b24dfeb3.html">女士鞋</a>
                <a href="//www.jd.com/cppf/9847333cd3d99d6886d9.html">实木沙发</a>
                <a href="//www.jd.com/book/737280eea8ac7dfea03.html">索尼电视</a>
                <a href="//www.jd.com/hotitem/9855fbd5a67b591890f1.html">卫浴品牌</a>
                <a href="//www.jd.com/zuozhe/7378d855fa5f85d59a5.html">奥克斯空调</a>
                <a href="//fresh.jd.com/shengxian/12218e48f879c700b44c1.html">百香果</a>
                <a href="//www.jd.com/zuozhe/652182fc3f82b3ca368.html">索尼耳机</a>
                <a href="https://yp.jd.com/737a2bfc76a93497485.html">风冷保鲜冰箱</a>
                <a href="https://www.jd.com/phb/737bbda49d4a1205c0f.html">冰箱118l</a>
                <a href="https://www.jd.com/phb/key_7377020b64a6042e7a8.html">印花内胆</a>
                <a href="https://www.jd.com/jiage/737fc6abe47013009e2.html">海尔冰箱241</a>
                <a href="https://www.jd.com/tupian/7378d3ea2b55747256f.html">南昌二手多门冰箱</a>
                <a href="https://www.jd.com/xinkuan/737eccda0bb5c8e2bcb.html">小型保鲜冰箱</a>
                <a href="https://www.jd.com/book/7375ca05d132f1e6677.html">西门子KG22N1116W</a>
                <a href="https://www.jd.com/zuozhe/737fe5493b0a9ba2468.html">小天鹅冰箱90l</a>
                <a href="https://www.jd.com/brand/7375bd14469a6e99488.html">利勃海尔十字对开门定频冰箱</a>
                <a href="https://www.jd.com/xinghao/737e8c5cb74d670f760.html">美菱冰箱钱</a>
                <a href="https://www.jd.com/cppf/73771da8c0682707280.html">樱花（SAKURA）直冷变频冰箱</a>
                <a href="https://www.jd.com/hprm/7373691d5410e7d33e6.html">酉门子冰箱</a>
                <a href="https://www.jd.com/sptopic/7373860d8e923905bc0.html">海尔兄弟中文版</a>
                <a href="https://www.jd.com/hotitem/737e091872e12677a3e.html">an1b3737c</a>
                <a href="https://www.jd.com/nrjs/1175c997899dc291.html">海尔冰箱BCD625哪款好？海尔冰箱BCD625怎么样好用吗？</a>
                <a href="https://www.jd.com/zxnews/f244fe013bf341fd.html">458WDVMU1哪款好？458WDVMU1怎么样好用吗？</a>
                <a href="https://www.jd.com/phb/zhishi/92c340ead63df08c.html">家用冰箱耗电量大吗</a>
                <a href="https://www.jd.com/phb/zhishi/e123fe4774d5ab6d.html">夏天蜂蜜要不要放冰箱</a>
                <a href="https://www.jd.com/jxinfo/5db6168b793cd9de.html">松下（Panasonic） NR-EC26WGP-S  冰箱</a>
                <a href="https://www.jd.com/jxinfo/3337483bb375ce42.html">日立（HITACHI） R-SBS2100C  冰箱</a>
            </div>
            <!-- CLUB_LINK end -->
            <script type="text/javascript">
                window.point.fs = new Date().getTime();
            </script>
            <!-- E ad2 -->
        </div>
        <script src="//misc.360buyimg.com/??jdf/lib/jquery-1.6.4.js,mtd/pc/common/js/o2_ua.js,mtd/pc/base/1.0.0/event.js"></script>
        <script src="//wl.jd.com/wl.js"></script>
        <script>
            // 直出代码
            var waitForEl = function(selector, callback) {
                if ($(selector).length) {
                    callback()
                } else {
                    setTimeout(function() {
                        waitForEl(selector, callback);
                    }, 100)
                }
            }

            waitForEl('#settleup .dropdown-layer', function() {
                $('#settleup .dropdown-layer').remove()
                // work the magic
            })
        </script>
        <style>
            .o2_ie8 .more2_international {
                filter: progid:dximagetransform.microsoft.alphaimageloader(src='//storage.360buyimg.com/mtd/home/more_international1575014601797.png',sizingMethod='scale');
                background: none;
            }

            .mod_help_cover {
                background-image: none;
            }

            #settleup:hover .cw-icon {
                border-bottom: 1px solid #c81623;
            }

            html.o2_gray {
                -webkit-filter: grayscale(100%);
                filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
            }

            .o2_mini .company .feed-tab {
                margin: 0 auto;
            }

            .company .feed-tab {
                margin: 0 auto;
            }
        </style>
        <div id="app"></div>
        <script type="text/javascript">
            window.point.dom = new Date().getTime();
        </script>
    </body>
    <script type="text/javascript" src="//misc.360buyimg.com/mtd/pc/index_2019/1.0.0/static/js/runtime.js"></script>
    <script type="text/javascript" src="//misc.360buyimg.com/mtd/pc/index_2019/1.0.0/static/js/index.chunk.js"></script>
    <script type="text/javascript">
        window.point.js = new Date().getTime();
    </script>
</html>
```




### `<head>`

```html



```



### DNS 预取

```html
<link rel="dns-prefetch" href="//static.360buyimg.com"/>
<link rel="dns-prefetch" href="//misc.360buyimg.com"/>
<link rel="dns-prefetch" href="//img10.360buyimg.com"/>
<link rel="dns-prefetch" href="//img11.360buyimg.com"/>
<link rel="dns-prefetch" href="//img12.360buyimg.com"/>
<link rel="dns-prefetch" href="//img13.360buyimg.com"/>
<link rel="dns-prefetch" href="//img14.360buyimg.com"/>
<link rel="dns-prefetch" href="//img20.360buyimg.com"/>
<link rel="dns-prefetch" href="//img30.360buyimg.com"/>
<link rel="dns-prefetch" href="//d.3.cn"/>
<link rel="dns-prefetch" href="//d.jd.com"/>
```







### 图片

#### 分配到不同 CDN 域名

```html
<link rel="dns-prefetch" href="//misc.360buyimg.com"/>
<link rel="dns-prefetch" href="//img10.360buyimg.com"/>
<link rel="dns-prefetch" href="//img11.360buyimg.com"/>
<link rel="dns-prefetch" href="//img12.360buyimg.com"/>
<link rel="dns-prefetch" href="//img13.360buyimg.com"/>
<link rel="dns-prefetch" href="//img14.360buyimg.com"/>
<link rel="dns-prefetch" href="//img20.360buyimg.com"/>
<link rel="dns-prefetch" href="//img30.360buyimg.com"/>
```

#### 动态加载

这个怎么动态处理的？

Chrome 使用  abc.jpg.webp

Safari 使用 abc.jpg


#### 懒加载






