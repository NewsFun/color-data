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
        canvas.height = params.height;
        canvas.width = params.width;
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