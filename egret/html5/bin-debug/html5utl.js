var Html5;
(function (Html5) {
    var html5util = (function () {
        function html5util() {
        }
        var d = __define,c=html5util,p=c.prototype;
        return html5util;
    }());
    Html5.html5util = html5util;
    egret.registerClass(html5util,'Html5.html5util');
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    Html5.createBitmapByName = createBitmapByName;
})(Html5 || (Html5 = {}));
