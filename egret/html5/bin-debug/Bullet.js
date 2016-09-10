/**
 * Created by shaorui on 14-6-7.
 */
var Html5;
(function (Html5) {
    /**
     * 子弹，利用对象池
     */
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet(texture, textureName) {
            _super.call(this, texture);
            this.textureName = textureName;
        }
        var d = __define,c=Bullet,p=c.prototype;
        /**生产*/
        Bullet.produce = function (textureName) {
            if (Html5.Bullet.cacheDict[textureName] == null)
                Html5.Bullet.cacheDict[textureName] = [];
            var dict = Html5.Bullet.cacheDict[textureName];
            var bullet;
            if (dict.length > 0) {
                bullet = dict.pop();
            }
            else {
                bullet = new Html5.Bullet(RES.getRes(textureName), textureName);
            }
            return bullet;
        };
        /**回收*/
        Bullet.reclaim = function (bullet) {
            var textureName = bullet.textureName;
            if (Html5.Bullet.cacheDict[textureName] == null)
                Html5.Bullet.cacheDict[textureName] = [];
            var dict = Html5.Bullet.cacheDict[textureName];
            if (dict.indexOf(bullet) == -1)
                dict.push(bullet);
        };
        Bullet.cacheDict = {};
        return Bullet;
    }(egret.Bitmap));
    Html5.Bullet = Bullet;
    egret.registerClass(Bullet,'Html5.Bullet');
})(Html5 || (Html5 = {}));
