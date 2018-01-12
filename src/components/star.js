class Motion{
    constructor(arg){
        const config = {
            x : 100,
            y : 100,
            vx : 1,
            vy : 1,
            ve : 1,
            wait: 0,
            errorRange: 1,
            distance: null,
            attention: false
        };
        
        let option = Object.assign(config, arg);
        this.initData(option);
    }
    // 初始化数据
    initData(option){
        Object.assign(this, option);
    }
    // 刹车
    arrived(distance){
        // console.log(distance);
        if(distance<this.errorRange) return true;

        if(this.distance===null){
            this.distance = distance;
        }else{
            if(this.distance === distance){
                this.distance = null;
                return true;
            }
            this.distance = Math.min(this.distance, distance);
        }
        return false;
    }
    // 暂停
    delay() {
        if(this.wait>0){
            this.wait -= 1;
        }else{
            this.wait = 0;
        }
        return this.wait>0;
    }
    // 获取坐标差和距离
    getDistance(n, details) {
        let dx = n.x - this.x;
        let dy = n.y - this.y;
        let d = Math.sqrt( dx*dx + dy*dy );
        
        return details ? [dx, dy, d] : d;
    }
    // 运动流程控制
    movement(){
        if(!this.delay()) this.selectMoveType();
        return {
            x: this.x, 
            y: this.y
        };
    }
    selectMoveType(){
        switch(this.type){
            case 'linear': 
                this.rectilinear(this.position).update();
                break;
            default: break;
        }
    }
    // 直线运动
    rectilinear(position) {
        let vel = this.getDistance(position, true);
        if(!this.attention) this.attention = this.arrived(vel[2]);
        if(!this.attention){
            this.vx = vel[0]/vel[2]*this.ve;
            this.vy = vel[1]/vel[2]*this.ve;
        }else{
            this.vx = 0;
            this.vy = 0;
        }
        return this;
    }
    // 更新坐标
    update(){
        this.x += this.vx;
        this.y += this.vy;
    }
}

export class Star {
    constructor(arg){
        const config = {
            x : 100,
            y : 100,
            ctx: null,
            img: null,
            width: 50,
            height: 50
        };
        this.motions = [];
        this.step = null;
        this.stepNum = 0;

        let option = Object.assign(config, arg);
        this.initData(option);
    }
    initData(option){
        this.x = option.x;
        this.y = option.y;
        this.ctx = option.ctx;
        this.img = option.img;
        this.width = option.width;
        this.height = option.height;
        
        if(option.img) this.shape = 'img';
    }
    setMotion(arg){
        for(let i = 0;i<arg.length;i++){
            let config = arg[i];
            let motion = new Motion(config);
            if(i<1){
                motion.x = this.x;
                motion.y = this.y;
            }else{
                motion.x = arg[i-1].position.x;
                motion.y = arg[i-1].position.y;
            }
            this.motions.push(motion);
        }

        return this;
    }
    render() {
        let mot = this.stepBy();
        if(mot){
            let coord = mot.movement();
            this.x = coord.x;
            this.y = coord.y;
        }
        
        this.drawShape(this.ctx);
    }
    stepBy(){
        let mot = this.motions[this.stepNum];
        if(mot&&mot.attention) this.stepNum+=1;
        return mot;
    }
    drawShape(ctx){
        switch(this.shape){
            case 'img':
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
                break;
            case 'square':

                break;
            case 'circle':

                break;
            default: break;
        }
    }
}