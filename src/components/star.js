import { Motion } from './motion';

export class Star {
    constructor(arg){
        const config = {
            coord:{
                x : 100,
                y : 100
            },
            width: 50,
            height: 50
        };
        
        this.step = null;
        this.stepNum = 0;
        this.motions = [];
        
        let option = Object.assign(config, arg);
        
        this.initData(option);
    }
    // 初始化数据
    initData(option){
        Object.assign(this, option);
        // this.ctx = option.ctx;
        // this.img = option.img;
        // this.shape = option.shape;
        // this.coord = option.coord;
        // this.width = option.width;
        // this.height = option.height;
        // this.stageWidth = option.stageWidth;
        // this.stageHeight = option.stageHeight;

        if(option.img) this.shape = 'img';
    }
    // 渲染类型
    drawShape(){
        switch(this.shape){
            case 'img':
                this.ctx.drawImage(this.img, this.coord.x, this.coord.y, this.width, this.height);
                break;
            case 'square':

                break;
            case 'round':
                this.showPoint(this.coord);
                break;
            default: break;
        }
    }
    // 清楚当前元素
    erase(){
        let bound = this.getStarBounds();
        let ut = bound.upperLeft;
        let lr = bound.lowerRight;
        
        this.ctx.clearRect(ut.x, ut.y, lr.x, lr.y);
        return this;
    }
    // 获取精灵边界
    getStarBounds(){
        let lt_x = this.coord.x;
        let lt_y = this.coord.y;
        let rb_x = this.coord.x+this.width;
        let rb_y = this.coord.y+this.height;

        return {
            upperLeft: this.coord,
            lowerLeft: {
                x: lt_x,
                y: rb_y
            },
            upperRight: {
                x: rb_x,
                y: lt_y
            },
            lowerRight: {
                x: rb_x,
                y: rb_y
            }
        };
    }
    // 获取舞台边界
    getStageBounds(){
        let rw = this.width;
        let rh = this.height;
        
        if(this.shape === 'round'){
            rw = this.radius;
            rh = this.radius;
        }
        return {
            minWidth: 0,
            minHeight: 0,
            maxWidth: this.stageWidth-rw,
            maxHeight: this.stageHeight-rh
        };
    }
    // 渲染
    render(){
        let mot = this.stepBy();
        if(mot) this.coord = mot.movement();

        this.drawShape();
    }
    // 绘制点
    showPoint(point){
        let ctx = this.ctx;
        
        ctx.save();
        ctx.fillStyle = '#00ff00';
        ctx.arc(point.x, point.y, 2, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
    }
    // 设置运动路线
    setMotion(arg){
        let stageMsg = this.getStageBounds();

        for(let i = 0;i<arg.length;i++){
            let config = Object.assign({}, stageMsg, arg[i]);
            // console.log(config);
            let motion = new Motion(config);
            if(i<1){
                motion.coord = this.coord;
            }else{
                motion.coord = arg[i-1].endPos;
            }
            this.motions.push(motion);
        }

        return this;
    }
    // 运动步骤控制
    stepBy(){
        let mot = this.motions[this.stepNum];
        if(mot&&mot.attention) this.stepNum+=1;
        return mot;
    }
}