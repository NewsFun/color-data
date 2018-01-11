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
    initData(option){
        Object.assign(this, option);
    }
    movement(){
        switch(this.type){
            case 'linear': 
                this.rectilinear(this.position).update();
                break;
            default: break;
        }
        return {
            x: this.x, 
            y: this.y
        };
    }
    delay() {
        if(this.wait>0){
            this.wait -= 1;
        }else{
            this.wait = 0;
        }
        return this.wait>0;
    }
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
    getDistance(n, details) {
        let dx = n.x - this.x;
        let dy = n.y - this.y;
        let d = Math.sqrt( dx*dx + dy*dy );
        
        return details ? [dx, dy, d] : d;
    }
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
        this.width = option.width;
        this.height = option.height;
        
        if(option.img) this.shape = 'img';
    }
    setMotion(arg){
        let motion = new Motion(arg);
        motion.x = this.x;
        motion.y = this.y;
        this.motions.push(motion);
    }
    render() {
        let coord = this.stepBy().movement();
        this.x = coord.x;
        this.y = coord.y;

        this.drawShape(this.ctx);
    }
    stepBy(){
        let mot = this.motions[this.stepNum];
        if(mot.attention) this.stepNum+=1;
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