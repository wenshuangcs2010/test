/**
 * Created by shaorui on 14-6-7.
 */
/**
 * 飞机，利用对象池
 */
var Airplane = (function (_super) {
    __extends(Airplane, _super);
    function Airplane(texture, fireDelay) {
        _super.call(this);
        /**飞机生命值*/
        this.blood = 10;
        this.fireDelay = fireDelay;
        this.bmp = new egret.Bitmap(texture);
        this.bmp.scaleX = 0.3;
        this.bmp.scaleY = 0.3;
        this.addChild(this.bmp);
        this.fireTimer = new egret.Timer(fireDelay);
        this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
    }
    var d = __define,c=Airplane,p=c.prototype;
    /**生产*/
    Airplane.produce = function (textureName, fireDelay) {
        if (Airplane.cacheDict[textureName] == null)
            Airplane.cacheDict[textureName] = [];
        var dict = Airplane.cacheDict[textureName];
        var theFighter;
        if (dict.length > 0) {
            theFighter = dict.pop();
        }
        else {
            theFighter = new Airplane(RES.getRes(textureName), fireDelay);
        }
        theFighter.blood = 10;
        return theFighter;
    };
    /**回收*/
    Airplane.reclaim = function (theFighter, textureName) {
        if (Airplane.cacheDict[textureName] == null)
            Airplane.cacheDict[textureName] = [];
        var dict = Airplane.cacheDict[textureName];
        if (dict.indexOf(theFighter) == -1)
            dict.push(theFighter);
    };
    /**开火*/
    p.fire = function () {
        this.fireTimer.start();
    };
    /**停火*/
    p.stopFire = function () {
        this.fireTimer.stop();
    };
    /**创建子弹*/
    p.createBullet = function (evt) {
        this.dispatchEventWith("createBullet");
    };
    Airplane.cacheDict = {};
    return Airplane;
}(egret.DisplayObjectContainer));
egret.registerClass(Airplane,'Airplane');
