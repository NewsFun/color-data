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
        this.ctx = option.ctx;
        this.img = option.img;
        this.coord = option.coord;
        this.width = option.width;
        this.height = option.height;
        this.stageWidth = option.stageWidth;
        this.stageHeight = option.stageHeight;

        if(option.img) this.shape = 'img';
    }
    // 清楚当前元素
    clearShape(){
        let xstart = this.coord.x;
        let ystart = this.coord.y;
        let xend = xstart+this.width;
        let yend = ystart+this.height;
        this.ctx.clearRect(xstart, ystart, xend, yend);
    }
    // 渲染类型
    drawShape(ctx){
        // this.clearShape();
        switch(this.shape){
            case 'img':
                ctx.drawImage(this.img, this.coord.x, this.coord.y, this.width, this.height);
                break;
            case 'square':

                break;
            case 'round':

                break;
            default: break;
        }
    }
    // 获取运动边界
    getBounds(){
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
        
        this.drawShape(this.ctx);
    }
    // 设置运动路线
    setMotion(arg){
        let stageMsg = this.getBounds();

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