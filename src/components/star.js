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
        this.motions = [];
        this.step = null;
        this.stepNum = 0;

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
        
        if(option.img) this.shape = 'img';
    }
    // 设置运动路线
    setMotion(arg){
        for(let i = 0;i<arg.length;i++){
            let config = arg[i];
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
    // 渲染
    render(){
        let mot = this.stepBy();
        if(mot) this.coord = mot.movement();
        
        this.drawShape(this.ctx);
    }
    // 运动步骤控制
    stepBy(){
        let mot = this.motions[this.stepNum];
        if(mot&&mot.attention) this.stepNum+=1;
        return mot;
    }
    // 渲染类型
    drawShape(ctx){
        switch(this.shape){
            case 'img':
                ctx.drawImage(this.img, this.coord.x, this.coord.y, this.width, this.height);
                break;
            case 'square':

                break;
            case 'circle':

                break;
            default: break;
        }
    }
}