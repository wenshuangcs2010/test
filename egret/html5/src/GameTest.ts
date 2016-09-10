module Html5{
    export class GameTest extends egret.DisplayObjectContainer{
        /**@private*/
        private stageW:number;
        /**@private*/
        private stageH:number;
        /**开始按钮*/
        private btnStart:egret.Bitmap;
        /**可滚动背景*/
        private bg:Html5.BgMap;
        /**我的飞机*/
        private myFighter:Airplane;
        /**我的子弹*/
        private myBullets:Html5.Bullet[] = [];
        /**敌人的飞机*/
        //private enemyFighters:fighter.Airplane[] = [];
        /**触发创建敌机的间隔*/
       // private enemyFightersTimer:egret.Timer = new egret.Timer(1000);
        /**敌人的子弹*/
        private enemyBullets:Html5.Bullet[] = [];
        /**成绩显示*/
       // private scorePanel:Html5.ScorePanel;
        /**我的成绩*/
       // private myScore:number = 0;
        /**@private*/
        private _lastTime:number;
        public constructor() {
            super();
            this._lastTime = egret.getTimer();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
        /**初始化*/
        private onAddToStage(event:egret.Event){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.createGameScene();
        }
        /**创建游戏场景*/
        private createGameScene():void{
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            //背景
            this.bg=new Html5.BgMap();//创建可滚动的背景
            this.addChild(this.bg);
            this.bg.start();
            //开始按钮

            //我的飞机
             this.myFighter = new Airplane(RES.getRes("plane_png"),100);
             this.myFighter.y = this.stageH-this.myFighter.height-50;
             this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
             this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
            this.addChild(this.myFighter);

            this.touchEnabled = true;
            this.myFighter.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
            this.myFighter.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);



            this.myFighter.fire();
            this.myFighter.blood = 10;
            this.myFighter.addEventListener("createBullet",this.createBulletHandler,this);


            //this.scorePanel = new fighter.ScorePanel();
            //预创建
            //this.preCreatedInstance();
        }
        private _touchStatus:boolean = false;              //当前触摸状态，按下时，值为true
        private _distance:egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
        private mouseDown(evt:egret.TouchEvent)
        {
            this._touchStatus = true;
            this._distance.x = evt.stageX - this.myFighter.x;

            console.log("Mouse Down.");
            this._distance.y = evt.stageY - this.myFighter.y;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        }
        private mouseMove(evt:egret.TouchEvent)
        {

            if( this._touchStatus )
            {
                console.log("moving now ! Mouse: [X:"+evt.stageX+",Y:"+evt.stageY+"]");
                this.myFighter.x = evt.stageX - this._distance.x;
                this.myFighter.y = evt.stageY - this._distance.y;
            }
        }
        private mouseUp(evt:egret.TouchEvent)
        {
            console.log("Mouse Up.");
            this._touchStatus = false;
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        }


        private createBulletHandler(evt:egret.Event):void{
            var bullet:Html5.Bullet;
            if(evt.target==this.myFighter) {
                for(var i:number=0;i<2;i++) {
                    bullet = Html5.Bullet.produce("zd");
                    bullet.x = i==0?(this.myFighter.x+10):(this.myFighter.x+this.myFighter.width-22);
                    bullet.y = this.myFighter.y+30;
                    this.addChildAt(bullet,this.numChildren-1);
                    this.myBullets.push(bullet);
                }
            } else {
                var theFighter:Airplane = evt.target;
                bullet = Html5.Bullet.produce("zd2");
                bullet.x = theFighter.x+28;
                bullet.y = theFighter.y+10;
                this.addChildAt(bullet,this.numChildren-1);
                this.enemyBullets.push(bullet);
            }
        }

        /**响应Touch*/
        private touchHandler(evt:egret.TouchEvent):void{
            if(evt.type==egret.TouchEvent.TOUCH_MOVE)
            {
                var tx:number = evt.localX;
                tx = Math.max(0,tx);
                tx = Math.min(this.stageW-this.myFighter.width,tx);
                this.myFighter.x = tx;
            }

        }
        private gameViewUpdate(evt:egret.Event):void{
            var nowTime:number = egret.getTimer();
            var fps:number = 1000/(nowTime-this._lastTime);
            this._lastTime = nowTime;
            var speedOffset:number = 60/fps;
            var i:number = 0;
            var bullet:Html5.Bullet;
            var myBulletsCount:number = this.myBullets.length;
            for(;i < myBulletsCount;i++){
                bullet = this.myBullets[i];
                if(bullet.y < -bullet.height){
                    this.removeChild(bullet);
                    Bullet.reclaim(bullet);
                    this.myBullets.splice(i,1);
                    i--;
                    myBulletsCount--;
                }
                bullet.y -= 15 * speedOffset;

            }
        }

    }
}