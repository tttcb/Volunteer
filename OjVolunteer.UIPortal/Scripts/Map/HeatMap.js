// ajax加载调试用
//# sourceURL=base-BaiduMap.js

var BaiduMapObj = (function () {
    var map = null;
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
        var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, size: 3, isOpen: 1 });
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
        map.addControl(ctrl_sca);
    }
    //热力图添加函数
    this.addHeatMap=function(map, markerArr)
    {
        if (!isSupportCanvas()) {
            alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
        }
        //详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
	//参数说明如下:
	/* visible 热力图是否显示,默认为true
     * opacity 热力的透明度,1-100
     * radius 势力图的每个点的半径大小   
     * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
     *	{
			.2:'rgb(0, 255, 255)',
			.5:'rgb(0, 110, 255)',
			.8:'rgb(100, 0, 255)'
		}
		其中 key 表示插值的位置, 0~1. 
		    value 为颜色值. 
     */
        heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 35 });
        map.addOverlay(heatmapOverlay);
        heatmapOverlay.setDataSet({ data: markerArr, max: 50 });
        //是否显示热力图
        
        (function setGradient() {
            /*格式如下所示:
          {
                  0:'rgb(102, 255, 0)',
                    .5:'rgb(255, 170, 0)',
                  1:'rgb(255, 0, 0)'
          }*/
            var gradient = {
                .2: 'rgb(0, 255, 255)',
                .5: 'rgb(0, 110, 255)',
                .8: 'rgb(100, 0, 255)'
            };
            var colors = document.querySelectorAll("input[type='color']");
            colors = [].slice.call(colors, 0);
            colors.forEach(function (ele) {
                gradient[ele.getAttribute("data-key")] = ele.value;
            });
            //heatmapOverlay.setOptions({ "gradient": gradient });
        })()
        //判断浏览区是否支持canvas
        function isSupportCanvas() {
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        }
    }
    //初始化(地图容器id，中心点坐标x，y，标注点数组，[地图等级：默认13]）
    this.init = function (id, x, y, markerArr, level) {
        var _level = level == undefined ? 12 : level;
        map = BaiduMapObj.createMap(id, x, y, _level);
        BaiduMapObj.setMapEvent(map);//设置地图事件
        BaiduMapObj.addMapControl(map);//向地图添加控件
        BaiduMapObj.addHeatMap(map, markerArr);
    }
    return this;
}).call({});