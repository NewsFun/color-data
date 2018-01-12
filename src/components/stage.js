import { Star } from './star';

export class Stage{
    constructor(params){
        const config = {
            el: '#canvas',
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        let option = Object.assign(config, params);

        this.renderList= {};
        this.option = option;
        this.width = option.width;
        this.height = option.height;
        this.canvas = this.initCanvas(option);
        this.ctx = this.canvas.getContext('2d');
        
    }
    initCanvas(option){
        let canvas = document.querySelector(option.el);
        canvas.height = option.height;
        canvas.width = option.width;

        return canvas;
    }
    setActors(option){
        const stageMsg = {
            ctx: this.ctx,
            maxWidth: this.width,
            maxHeight: this.height
        };
        const actorMsg = Object.assign(stageMsg, option);
        let actor = new Star(actorMsg);
        this.renderList[option.key] = actor;
        
        return actor;
    }
    getActors(key){
        return this.renderList[key];
    }
    renderStage(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.update();
    }
    update(){
        let keys = Object.keys(this.renderList);
        for(let i = 0;i<keys.length;i++){
            let actor = this.renderList[keys[i]];
            actor.render();
        }
    }
    animate() {
        const self = this;
        const anim = ()=>{
            self.renderStage();
            requestAnimationFrame(anim);
        };
        anim();
    }
}