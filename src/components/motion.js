export class Motion{
    constructor(arg){
        const config = {
            coord:{
                x : 100,
                y : 100
            },
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
    // 红灯
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
        let dx = n.x - this.coord.x;
        let dy = n.y - this.coord.y;
        let d = Math.sqrt( dx*dx + dy*dy );
        
        return details ? [dx, dy, d] : d;
    }
    // 运动流程控制
    movement(){
        if(!this.delay()) this.selectMoveType();
        return this.coord;
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
    // 路径类型
    selectMoveType(){
        if(!this.type) console.log('you need defined a "type" to start Motion!');
        
        switch(this.type){
            case 'linear': 
                this.rectilinear(this.position).update();
                break;
            default: break;
        }
    }
    // 更新坐标
    update(){
        this.coord.x += this.vx;
        this.coord.y += this.vy;
    }
}