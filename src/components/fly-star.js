class FlyStar{
    constructor(params){
        const config = {
            el: '#canvas',
            width: window.innerWidth,
            height: window.innerHeight
        };

        let option = Object.assign(config, params);

        this.option = option;
        this.canvas = this.initCanvas(option);
        this.ctx = this.canvas.getContext('2d');
        this.width = option.width;
        this.height = option.height;
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
    update(){

    }
    animate() {
        this.render(this.ctx);
        requestAnimationFrame(this.animate);
    }
}

class Star {
    constructor(arg){
        const stage = new FlyStar();
        const config = {
            x : 100,
            y : 100,
            vx : 1,
            vy : 1,
            wait: 0,
            width: 50,
            height: 50
        };
        this.ctx = stage.ctx;

        let option = Object.assign(config, arg);
        
        this.x = option.x;
        this.y = option.y;
        this.vx = option.vx;
        this.vy = option.vy;
        this.img = option.img;
        this.wait = option.wait;
        this.width = option.width;
        this.height = option.height;

        // this.img = this.imageLoad(option.imgUrl);
    }
    imageLoad(url){
        let img = new Image;
        if(url){
            img.src = this.imgUrl;
        }
        return img;
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
        this.render();
    }
    render() {
        if(!this.delay()){
            this.x += this.vx;
            this.y += this.vy;
        }
        console.log(this.img);
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    distance(n, details) {
        let dx = n.x - this.x;
        let dy = n.y - this.y;
        let d = Math.sqrt( dx*dx + dy*dy );

        return details ? [dx, dy, d] : d;
    }
}

export default Star;