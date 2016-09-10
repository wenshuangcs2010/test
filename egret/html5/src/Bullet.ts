/**
 * Created by shaorui on 14-6-7.
 */
module Html5
{
    /**
     * 子弹，利用对象池
     */
    export class Bullet extends egret.Bitmap
    {
        private static cacheDict:Object = {};
        /**生产*/
        public static produce(textureName:string):Html5.Bullet
        {
            if(Html5.Bullet.cacheDict[textureName]==null)
                Html5.Bullet.cacheDict[textureName] = [];
            var dict:Html5.Bullet[] = Html5.Bullet.cacheDict[textureName];
            var bullet:Html5.Bullet;
            if(dict.length>0) {
                bullet = dict.pop();
            } else {
                bullet = new Html5.Bullet(RES.getRes(textureName),textureName);
            }
            return bullet;
        }
        /**回收*/
        public static reclaim(bullet:Html5.Bullet):void
        {
            var textureName: string = bullet.textureName;
            if(Html5.Bullet.cacheDict[textureName]==null)
                Html5.Bullet.cacheDict[textureName] = [];
            var dict:Html5.Bullet[] = Html5.Bullet.cacheDict[textureName];
            if(dict.indexOf(bullet)==-1)
                dict.push(bullet);
        }

        private textureName:string;//可视为子弹类型名

        public constructor(texture:egret.Texture,textureName: string) {
            super(texture);
            this.textureName = textureName;
        }
    }
}
