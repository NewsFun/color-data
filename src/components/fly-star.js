export class Stage{
    constructor(params){
        const config = {
            el: '#canvas',
            width: window.innerWidth,
            height: window.innerHeight,
            renderList: []
        };

        let option = Object.assign(config, params);

        this.option = option;
        this.width = option.width;
        this.height = option.height;
        this.canvas = this.initCanvas(option);
        this.ctx = this.canvas.getContext('2d');
    }
    initCanvas(params){
        let canvas = document.querySelector(params.el);
        canvas.width = params.width;
        canvas.height = params.height;
        return canvas;
    }
    render(ctx){
        ctx.clearRect(0, 0, this.width, this.height);
        this.update(ctx);
    }
    update(ctx){
        for(let i = 0;i<this.renderList.length;i++){
            this.renderList[i](ctx);
        }
    }
    animate() {
        this.render(this.ctx);
        requestAnimationFrame(this.animate);
    }
}

export class Star {
    constructor(arg){
        const config = {
            x : 100,
            y : 100,
            vx : 1,
            vy : 1,
            wait: 0,
            width: 50,
            height: 50
        };

        let option = Object.assign(config, arg);
        
        this.x = option.x;
        this.y = option.y;
        this.vx = option.vx;
        this.vy = option.vy;
        this.img = option.img;
        this.wait = option.wait;
        this.stage = option.ctx;
        this.width = option.width;
        this.height = option.height;
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
        let vel = this.distance(position, true);
        this.vx = vel[0]/vel[2];
        this.vy = vel[1]/vel[2];
        this.render(this.ctx);
    }
    render(ctx) {
        if(!this.delay()){
            this.x += this.vx;
            this.y += this.vy;
        }
        
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    distance(n, details) {
        let dx = n.x - this.x;
        let dy = n.y - this.y;
        let d = Math.sqrt( dx*dx + dy*dy );

        return details ? [dx, dy, d] : d;
    }
}