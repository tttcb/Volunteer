// ajax加载调试用


var BaiduMapObj = (function () {
    var map = null;
    AllTime = 0.0;
    BMap.Marker.prototype.time = 0.0;
    BMap.Marker.prototype.setTime = function (time) {
        this.time = time;
    }
    BMap.Icon.prototype.name = "";
    BMap.Icon.prototype.setName = function (name) {
        this.name = name;
    }
    var icon = new Array(5);
    for (var i = 0; i < 5; i++) {
        if (i == 2) continue;
        icon[i] = new BMap.Icon('../Scripts/Map/icon'+i+'.png', new BMap.Size(24, 25), {
            //anchor: new BMap.Size(12, 25),
            infoWindowAnchor: new BMap.Size(12, 0)
        });
        icon[i].setName(i); //对这个图标设定它的name属性值；
    }
    
   
    //搜索地区(地区）
    this.searchMap = function (id, txtWords, markerArr) {
        var area = document.getElementById(txtWords).value; //得到地区
        var ls = new BMap.LocalSearch(map);
        ls.setSearchCompleteCallback(function (rs) {
            if (ls.getStatus() == BMAP_STATUS_SUCCESS) {
                var poi = rs.getPoi(0);
                if (poi) {
                    BaiduMapObj.init(id, poi.point.lng, poi.point.lat, markerArr);
                }
            }
        });
        ls.search(area);
    };
    //创建地图函数：
    this.createMap = function (id, x, y, _level) {
        var map = new BMap.Map(id, { enableMapClick: false });//在百度地图容器中创建一个地图
        var point = new BMap.Point(x, y);//定义一个中心点坐标
        map.centerAndZoom(point, _level);//设定地图的中心点和坐标并将地图显示在地图容器中
        return map;
    }
    //地图事件设置函数：
    this.setMapEvent = function (map) {
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }
    //地图控件添加函数：
    this.addMapControl = function (map) {
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT,size:3, isOpen: 1 });
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
        map.addControl(ctrl_sca);
    }
    //演示点位1
    this.addM1 = function (map) {
        var p0 = 120.716317;
        var p1 = 27.923658;
        var point = new BMap.Point(p0, p1);
        var iconImg = icon[4];
        var marker = new BMap.Marker(point, { icon: iconImg });//创建图标 , { icon: iconImg }
        marker.setTime(0);//在marker里添加时间*人数

        map.addOverlay(marker);
        (function () {
            var index = i;
            //设置弹框的样式
            var sContent = "<h4 style=' margin:0 0 5px 0;padding:0.2em 0;'><a style='color:black;' href='/Activity/Details/?Id="
                + 111111111
                + "'>"
                + "志愿者计算机维修"
                + "</a></h4>"
                + "<video src='../Scripts/Map/2.avi' poster = 'images/snow.jpg' width = '320' height = '240' controls  autoplay=true> <p>A video of snow in WHU</p> </video >"
                
                + "</div>";
            var _iw = new BMap.InfoWindow(sContent);
            var _marker = marker;
            _marker.addEventListener("click", function () {
                this.openInfoWindow(_iw);
            });
        })()
    
    
    };
    //演示点位2
    this.addM2 = function (map) {
        var p0 = 120.712123;
        var p1 = 27.922503;
        var point = new BMap.Point(p0, p1);
        var iconImg = icon[4];
        var marker = new BMap.Marker(point, { icon: iconImg });//创建图标 , { icon: iconImg }
        marker.setTime(0);//在marker里添加时间*人数

        map.addOverlay(marker);
        (function () {
            var index = i;
            //设置弹框的样式
            var sContent = "<h4 style=' margin:0 0 5px 0;padding:0.2em 0;'><a style='color:black;' href='/Activity/Details/?Id="
                + 1111111
                + "'>"
                + "红话筒志愿服务"
                + "</a></h4>"
                + "<video src='../Scripts/Map/1.avi' poster = 'images/snow.jpg' width = '320' height = '240' controls  autoplay=true> <p>A video of snow in WHU</p> </video >"
                
                + "</div>";
            var _iw = new BMap.InfoWindow(sContent);
            var _marker = marker;
            _marker.addEventListener("click", function () {
                this.openInfoWindow(_iw);
            });
        })()


    };

    //创建marker
    this.addMarker = function (map, markerArr) {
        for (var i = 0; i < markerArr.length; i++) {
            var json = markerArr[i];
            var p0 = json.p0;
            var p1 = json.p1;
            if (p0 == "" || p1 == "")
                continue;
            var point = new BMap.Point(p0, p1);
            var iconImg;
            AllTime += json.ActTime ;//总时间
            if (json.ActStatus == "0") {
                if (json.ActType == "1") {
                    iconImg = icon[1];
                }
                else if (json.ActType == "3") {
                    iconImg = icon[3];
                }
            }
            else iconImg = icon[4];
            var marker = new BMap.Marker(point,{icon:iconImg });//创建图标 , { icon: iconImg }
            marker.setTime(json.ActTime );//在marker里添加时间*人数
            
            map.addOverlay(marker);
            
            //marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
           

            (function () {
                var index = i;
                //设置弹框的样式
                var sContent = "<h4 style=' margin:0 0 5px 0;padding:0.2em 0;'><a style='color:black;' href='/Activity/Details/?Id="
                    + json.ActUrl
                    + "'>"
                    + json.ActName
                    + "</a></h4>"
                    + "<img style='float:right;margin:4px' id='imgDemo' src='"
                    +  json.ActImg
                    + "'width='320' height = '240' title = '"
                    + json.ActName
                    + "' /> "
                    + "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"
                    + json.ActAddressDetail
                    + "</p>"
                    + "</div>";
                var _iw = new BMap.InfoWindow(sContent); 
                var _marker = marker;
                _marker.addEventListener("click", function () {
                    this.openInfoWindow(_iw);
                });
                //_iw.addEventListener("open", function () {
                //    _marker.getLabel().hide();
                //})
                //_iw.addEventListener("close", function () {
                //    _marker.getLabel().show();
                //})
                //label.addEventListener("click", function () {
                //    _marker.openInfoWindow(_iw);
                //})
                //if (!!json.isOpen) {
                //    label.hide();
                //    _marker.openInfoWindow(_iw);
                //}
                //_marker.openInfoWindow(_iw);
            })()
        }
        $("#times").html("目前志愿者总时长为:" + AllTime);
    }
    //展示标记
    this.show = function (checkbox) {
        var allmap = map.getOverlays();
        var map_length = allmap.length;
        var sum = 0;
        var check_time = 0.0;
        if (checkbox.checked == true) {
            
            for (var i = 0; i < map_length; i++) {
                if (allmap[i].toString() == "[object Marker]") {
                    //console.log(i);
                    if (allmap[i].getIcon().name == checkbox.value) {
                        allmap[i].show()//显示
                        sum = sum + 1;
                        check_time += allmap[i].time;
                    }
                }

            }
        }
        else {
            for (var i = 0; i < map_length; i++) {
                if (allmap[i].toString() == "[object Marker]") {
                    //console.log(i);
                    if (allmap[i].getIcon().name == checkbox.value) {
                        allmap[i].hide()//隐藏
                        sum = sum - 1;
                        check_time -= allmap[i].time;
                    }
                }
            }
        }
        var htimes = $("#times").html();
        var hhtimes = htimes.substring(10);
        var hhhsum = Number(hhtimes) + check_time;
        $("#times").html("目前志愿者总时长为:" + hhhsum.toFixed(0));
        var hsum = $("#sum").html();//获取html里的内容
        var hhsum = hsum.substring(11);//取得后面的数字
        var hhhsum = Number(hhsum)+sum;
        $("#sum").html("目前志愿者活动总数为:" +hhhsum);

    }
    
    //初始化(地图容器id，中心点坐标x，y，标注点数组，[地图等级：默认13]）
    this.init = function (id, x, y, markerArr, level) {
        var _level = level == undefined ? 13 : level;
        map = BaiduMapObj.createMap(id, x, y, _level);
        BaiduMapObj.setMapEvent(map);//设置地图事件
        BaiduMapObj.addMapControl(map);//向地图添加控件
        BaiduMapObj.addM1(map);
        BaiduMapObj.addM2(map);
        BaiduMapObj.addMarker(map, markerArr);//向地图中添加marker

        
    }
    return this;
}).call({});
