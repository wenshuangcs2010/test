/**
 * Created by shaorui on 14-6-7.
 */

    /**
     * 飞机，利用对象池
     */
     class Airplane extends egret.DisplayObjectContainer
    {
        private static cacheDict:Object = {};
        /**生产*/
        public static produce(textureName:string,fireDelay:number):Airplane
        {
            if(Airplane.cacheDict[textureName]==null)
                Airplane.cacheDict[textureName] = [];
            var dict:Airplane[] =Airplane.cacheDict[textureName];
            var theFighter:Airplane;
            if(dict.length>0) {
                theFighter = dict.pop();
            } else {
                theFighter = new Airplane(RES.getRes(textureName),fireDelay);
            }
            theFighter.blood = 10;
            return theFighter;
        }
        /**回收*/
        public static reclaim(theFighter:Airplane,textureName:string):void
        {
            if(Airplane.cacheDict[textureName]==null)
                Airplane.cacheDict[textureName] = [];
            var dict:Airplane[] =Airplane.cacheDict[textureName];
            if(dict.indexOf(theFighter)==-1)
                dict.push(theFighter);
        }
        /**飞机位图*/
        private bmp:egret.Bitmap;
        /**创建子弹的时间间隔*/
        private fireDelay:number;
        /**定时射*/
        private fireTimer:egret.Timer;
        /**飞机生命值*/
        public blood:number = 10;

        public constructor(texture:egret.Texture,fireDelay:number) {
            super();
            this.fireDelay = fireDelay;
            this.bmp = new egret.Bitmap(texture);
            this.bmp.scaleX=0.3;
            this.bmp.scaleY=0.3;
            this.addChild(this.bmp);
            this.fireTimer = new egret.Timer(fireDelay);
            this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);


        }
        /**开火*/
        public fire():void {
            this.fireTimer.start();
        }
        /**停火*/
        public stopFire():void {
            this.fireTimer.stop();
        }
        /**创建子弹*/
        private createBullet(evt:egret.TimerEvent):void {
            this.dispatchEventWith("createBullet");
        }
                     //舞台中唯一显示对象

    }
