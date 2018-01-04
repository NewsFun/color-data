const canvas = document.getElementById('canvas');
const H = window.innerHeight;
const W = window.innerWidth;

canvas.height = H;
canvas.width = W;

const ctx = canvas.getContext('2d');
const img = new Image();
const stars = [];
const tars = [{x:100, y:200},{x:400, y:300}];
img.src='../resources/flystar.png';
img.onload = function () {
    initStars();
    animate();
};
class Star {
    constructor(arg){
        this.img = img;
        this.x = 0;
        this.y = 0;
        this.vx = 1;
        this.vy = 1;
        this.wait = 0;

        if(arg) extend(this, arg);
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
        ctx.drawImage(this.img,this.x,this.y);
    }
    distance(n, details) {
        let dx = n.x - this.x;
        let dy = n.y - this.y;
        let d = Math.sqrt( dx*dx + dy*dy );

        return details ? [dx, dy, d] : d;
    }
}

function initStars() {
    stars[0] = new Star({wait:300});
    stars[1] = new Star({wait:60});
    drawStars(stars);
}
function drawStars(array) {
    for(var i = 0;i<array.length;i++){
        array[i].moveTo(tars[i]);
    }
}
function extend(target, obj) {
    var keys = Object.keys(obj);
    for(var i = 0;i<keys.length;i++){
        target[keys[i]] = obj[keys[i]];
    }
}
function run(ctx){
    ctx.clearRect(0, 0, W, H);
    drawStars(stars);
}
function animate() {
    run(ctx);
    requestAnimationFrame(animate);
}
const FlyStar = {
    
};
export default FlyStar;