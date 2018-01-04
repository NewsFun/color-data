const W = window.innerWidth;
const H = window.innerHeight;
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

ctx.globalCompositeOperation = 'lighter';

const Fn = {
    randomNum(num=1, range=0){
        return Math.random()*num+range;
    },
    randomInt(num, range){
        return ~~this.randomNum(num, range);
    },
    extend(target, obj){
        let keys = Object.keys(obj);
        for(let i = 0;i<keys.length;i++){
            let v = keys[i];
            target[v] = obj[v];
        }
        return target;
    }
};
const Color = {
    randomColor(){
        let r = Fn.randomInt(255);
        let g = Fn.randomInt(255);
        let b = Fn.randomInt(255);
        return this.setColor(r, g, b, 1);
    },
    setColor(r, g, b, a){
        return 'rgba('+r+','+g+','+b+','+a+')';
    }
    
};

class Dot {
    constructor(args){
        this.x = args.x;
        this.y = args.y;
        this.r = args.r;
        this.c = args.c;
        this.vx= args.vx;
        this.vy= args.vy;
    }
}
class Motion {
    constructor(b){
        this.b = new Dot({
            x : b.x,
            y : b.y,
            r : b.r,
            c : b.c || Color.randomColor(),
            vx: (Fn.randomNum(1, -.5))*4,
            vy: (Fn.randomNum(1, -.5))*4
        });
        this.e = 0.07;
        this.s = true;
        this.delay = 0;
    }
    distance(n, details) {
        var dx = this.b.x - n.x,
            dy = this.b.y - n.y,
            d = Math.sqrt(dx * dx + dy * dy);

        return details ? [dx, dy, d] : d;
    }
    bounce(self){
        self.x += self.vx;
        self.y += self.vy;

        if(self.x - self.z <= 0){
            self.vx = -self.vx;
            self.x = self.z;
        }
        if(self.x + self.z >= W){
            self.vx = -self.vx;
            self.x = W-self.z;
        }
        if(self.y - self.z <= 0){
            self.vy = -self.vy;
            self.y = self.z;
        }
        if(self.y + self.z >= H){
            self.vy = -self.vy;
            self.y = H-self.z;
        }
    }
    update(goal){
        var dis = this.distance(goal, true);
        var d = dis[2], dx = dis[0], dy = dis[1];
        if(this.s){
            if(d>1){
                this.b.x -= dx*this.e;
                this.b.y -= dy*this.e;
            }else{
                this.b.x -= Math.sin(Fn.randomNum(3.142));
                this.b.y -= Math.sin(Fn.randomNum(3.142));
            }
        }else{
            this.bounce(this.b);
        }
    }
    moveTo(goal){
        this.update(goal);
        this.render(this.b);
    }
    wait() {
        let delay = this.delay;
        if(delay>0){
            delay -= 1;
        }else{
            delay = 0;
        }
        return delay>0;
    }
    drawShape(ball){
        ctx.save();
        ctx.fillStyle = ball.c;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.z, 0, Math.PI*2, true);
        ctx.fill();
        ctx.restore();
    }
    drawImg(ball){
        ctx.save();
        ctx.drawImage(ball.img, ball.x, ball.y);
        ctx.restore();
    }
    render(){
        if(this.delay<=0){
            this.drawShape(this.b);
        }
    }
}

export default Motion;