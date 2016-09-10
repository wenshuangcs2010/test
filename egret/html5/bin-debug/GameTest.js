var Html5;
(function (Html5) {
    var GameTest = (function (_super) {
        __extends(GameTest, _super);
        function GameTest() {
            _super.call(this);
            /**我的子弹*/
            this.myBullets = [];
            /**敌人的飞机*/
            //private enemyFighters:fighter.Airplane[] = [];
            /**触发创建敌机的间隔*/
            // private enemyFightersTimer:egret.Timer = new egret.Timer(1000);
            /**敌人的子弹*/
            this.enemyBullets = [];
            this._touchStatus = false; //当前触摸状态，按下时，值为true
            this._distance = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
            this._lastTime = egret.getTimer();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=GameTest,p=c.prototype;
        /**初始化*/
        p.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        };
        /**创建游戏场景*/
        p.createGameScene = function () {
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            //背景
            this.bg = new Html5.BgMap(); //创建可滚动的背景
            this.addChild(this.bg);
            this.bg.start();
            //开始按钮
            //我的飞机
            this.myFighter = new Airplane(RES.getRes("plane_png"), 100);
            this.myFighter.y = this.stageH - this.myFighter.height - 50;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
            this.addChild(this.myFighter);
            this.touchEnabled = true;
            this.myFighter.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
            this.myFighter.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
            this.myFighter.fire();
            this.myFighter.blood = 10;
            this.myFighter.addEventListener("createBullet", this.createBulletHandler, this);
            //this.scorePanel = new fighter.ScorePanel();
            //预创建
            //this.preCreatedInstance();
        };
        p.mouseDown = function (evt) {
            this._touchStatus = true;
            this._distance.x = evt.stageX - this.myFighter.x;
            console.log("Mouse Down.");
            this._distance.y = evt.stageY - this.myFighter.y;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        };
        p.mouseMove = function (evt) {
            if (this._touchStatus) {
                console.log("moving now ! Mouse: [X:" + evt.stageX + ",Y:" + evt.stageY + "]");
                this.myFighter.x = evt.stageX - this._distance.x;
                this.myFighter.y = evt.stageY - this._distance.y;
            }
        };
        p.mouseUp = function (evt) {
            console.log("Mouse Up.");
            this._touchStatus = false;
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        };
        p.createBulletHandler = function (evt) {
            var bullet;
            if (evt.target == this.myFighter) {
                for (var i = 0; i < 2; i++) {
                    bullet = Html5.Bullet.produce("zd");
                    bullet.x = i == 0 ? (this.myFighter.x + 10) : (this.myFighter.x + this.myFighter.width - 22);
                    bullet.y = this.myFighter.y + 30;
                    this.addChildAt(bullet, this.numChildren - 1);
                    this.myBullets.push(bullet);
                }
            }
            else {
                var theFighter = evt.target;
                bullet = Html5.Bullet.produce("zd2");
                bullet.x = theFighter.x + 28;
                bullet.y = theFighter.y + 10;
                this.addChildAt(bullet, this.numChildren - 1);
                this.enemyBullets.push(bullet);
            }
        };
        /**响应Touch*/
        p.touchHandler = function (evt) {
            if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
                var tx = evt.localX;
                tx = Math.max(0, tx);
                tx = Math.min(this.stageW - this.myFighter.width, tx);
                this.myFighter.x = tx;
            }
        };
        p.gameViewUpdate = function (evt) {
            var nowTime = egret.getTimer();
            var fps = 1000 / (nowTime - this._lastTime);
            this._lastTime = nowTime;
            var speedOffset = 60 / fps;
            var i = 0;
            var bullet;
            var myBulletsCount = this.myBullets.length;
            for (; i < myBulletsCount; i++) {
                bullet = this.myBullets[i];
                if (bullet.y < -bullet.height) {
                    this.removeChild(bullet);
                    Html5.Bullet.reclaim(bullet);
                    this.myBullets.splice(i, 1);
                    i--;
                    myBulletsCount--;
                }
                bullet.y -= 15 * speedOffset;
            }
        };
        return GameTest;
    }(egret.DisplayObjectContainer));
    Html5.GameTest = GameTest;
    egret.registerClass(GameTest,'Html5.GameTest');
})(Html5 || (Html5 = {}));
