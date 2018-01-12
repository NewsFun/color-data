import { Star } from './star';

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
    setActors(option){
        const stageMsg = {
            maxWidth: this.width,
            maxHeight: this.height
        };
        const actorMsg = Object.assign(stageMsg, option);
        let actor = new Star(actorMsg);
        this.renderList[option.key] = actor;
    }
    getActors(key){
        return this.renderList[key];
    }
    initCanvas(option){
        let canvas = document.querySelector(option.el);
        canvas.height = option.height;
        canvas.width = option.width;

        return canvas;
    }
    render(ctx){
        ctx.clearRect(0, 0, this.width, this.height);
        this.update();
    }
    update(){
        for(let i = 0;i<this.renderList.length;i++){
            this.renderList[i].render();
        }
    }
    animate() {
        this.render(this.ctx);
        requestAnimationFrame(this.animate);
    }
}