const PI = Math.PI;
const SIN = Math.sin;
const COS = Math.cos;
const ASIN = Math.asin;
const ROUND = Math.round;

export class Motion {
    constructor(arg) {
        const config = {
            coord: {
                x: 100,
                y: 100
            },
            vx: 1,
            vy: 1,
            ve: 1,
            va: 1,
            wait: 0,
            errorRange: 1
        };

        this.t = 0;
        this.distance = null;
        this.attention = false;

        let option = Object.assign(config, arg);
        this.initData(option);
    }
    // 初始化数据
    initData(option) {
        Object.assign(this, option);

        if (this.type === 'circling') {
            this.radius = ROUND(this.getDistance(option.endPos));
        }
    }
    // 刹车
    arrived(distance) {
        if (distance < this.errorRange) return true;

        if (this.distance === null) {
            this.distance = distance;
        } else {
            if (this.distance === distance) {
                this.distance = null;
                return true;
            }
            this.distance = Math.min(this.distance, distance);
        }
        return false;
    }
    // 直线反弹
    bounce(minWidth, maxWidth, minHeight, maxHeight) {

        if (this.coord.x <= minWidth) {
            this.vx = -this.vx;
            this.coord.x = minWidth;
        }
        if (this.coord.x >= maxWidth) {
            this.vx = -this.vx;
            this.coord.x = maxWidth;
        }
        if (this.coord.y <= minHeight) {
            this.vy = -this.vy;
            this.coord.y = minHeight;
        }
        if (this.coord.y >= maxHeight) {
            this.vy = -this.vy;
            this.coord.y = maxHeight;
        }

        return this;
    }
    // 圆周运动
    circling(radian = 0) {
        let rads = ~~radian;
        let rad = PI * this.t / 180;
        // console.log(radian);
        this.coord.x = this.endPos.x + COS(rad) * this.radius;
        this.coord.y = this.endPos.y + SIN(rad) * this.radius;
        if (rads > 0 && this.t >= rads) {
            this.attention = true;
        }
        this.t += this.va;
    }
    // 红灯
    delay() {
        if (this.wait > 0) {
            this.wait -= 1;
        } else {
            this.wait = 0;
        }
        return this.wait > 0;
    }
    // 获取坐标差和距离
    getDistance(n, details) {
        let dx = n.x - this.coord.x;
        let dy = n.y - this.coord.y;
        let d = Math.sqrt(dx * dx + dy * dy);

        return details ? [dx, dy, d] : d;
    }
    // 获取初始化夹角
    getInitAngle(center) {
        let d = this.getDistance(center, true);
        let sin = d[0] / d[2];
        let ang = ASIN(sin);
        return [ang, d[2]];
    }
    // 运动流程控制
    movement() {
        if (!this.attention && !this.delay()) this.selectMoveType();
        return this.coord;
    }
    // 直线运动
    rectilinear(endPos) {
        let vel = this.getDistance(endPos, true);
        if (!this.attention) this.attention = this.arrived(vel[2]);
        if (!this.attention) {
            this.vx = vel[0] / vel[2] * this.ve;
            this.vy = vel[1] / vel[2] * this.ve;
        } else {
            this.vx = 0;
            this.vy = 0;
        }
        return this;
    }
    // 路径类型
    selectMoveType() {
        if (!this.type) console.error('you need defined a "type" to start Motion!');

        switch (this.type) {
            case 'linear':
                this.rectilinear(this.endPos).update();
                break;
            case 'bounce':
                {
                    let minw = this.minWidth;
                    let maxw = this.maxWidth;
                    let minh = this.minHeight;
                    let maxh = this.maxHeight;
                    this.bounce(minw, maxw, minh, maxh).update();
                }
                break;
            case 'circling':
                this.circling(this.radian);
                break;
            default:
                break;
        }
    }
    // 更新坐标
    update() {
        this.coord.x += this.vx;
        this.coord.y += this.vy;
        this.t += 1;
    }
}