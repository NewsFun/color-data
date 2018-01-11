export class Star {
    constructor(arg){
        const config = {
            x : 100,
            y : 100,
            vx : 1,
            vy : 1,
            ve : 1,
            wait: 0,
            width: 50,
            height: 50
        };
        this.distance = null;
        this.errorRange = 1;
        this.attention = false;

        let option = Object.assign(config, arg);
        this.initData(option);
    }
    initData(option){

        this.x = option.x;
        this.y = option.y;
        this.vx = option.vx;
        this.vy = option.vy;
        this.ve = option.ve;
        this.img = option.img;
        this.ctx = option.ctx;
        this.wait = option.wait;
        this.width = option.width;
        this.height = option.height;
        
        if(option.img) this.shape = 'img';
    }
    delay() {
        if(this.wait>0){
            this.wait -= 1;
        }else{
            this.wait = 0;
        }
        return this.wait>0;
    }
    moveTo(position) {
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
            this.distance = Math.min(this.distance,distance);
        }
        return false;
    }
    update(){
        this.x += this.vx;
        this.y += this.vy;
    }
    render() {
        if(!this.delay()){
            this.update();
        }
        this.drawShape(this.ctx);
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
    getDistance(n, details) {
        let dx = n.x - this.x;
        let dy = n.y - this.y;
        let d = Math.sqrt( dx*dx + dy*dy );

        return details ? [dx, dy, d] : d;
    }
}