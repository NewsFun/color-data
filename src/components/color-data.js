class ColorData{
    constructor(params){
        const config = {
            type: 'square',
            color: '#3385ff',
            height: 100,
            width: 100,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            img: null
        };
        this.option = Object.assign(config, params);
    }
    moveTo(){

    }
    getKeyPoint(){
        let tx = this.option.x; 
        let ty = this.option.y;
        let tw = this.option.width;
        let th = this.option.height;
        this.left_top = {x:tx, y:ty};
        this.left_center = {x:tx, y:(ty+th)/2};
        this.left_bottom = {x:tx, y:ty+th};
    }
    render(){

    }
}
export default ColorData;