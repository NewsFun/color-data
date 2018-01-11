<template>
    <canvas id="canvas" ref="canvas">
        <img id="star" 
            src="../resources/flystar.png" 
            style="display:none" 
            alt="">
    </canvas>
</template>
<script>
import { Star } from './star';
import { Stage } from './fly-star';

const tars = [{x:200, y:400},{x:500, y:500}];
let stars = [];

export default {
    data(){
        return {
            img: null,
            ctx: null,
            stage: null,
            canvas: null,
            W: window.innerWidth,
            H: window.innerHeight
        };
    },
    methods:{
        animate() {
            this.ctx.clearRect(0, 0, this.W, this.H);
            this.drawStars(stars);
            requestAnimationFrame(this.animate);
        },
        initStars(img) {
            let sstar = new Star({ 
                ctx: this.ctx,
                // wait: 300,
                img: img, 
                x: 200, 
                ve: 10,
                y: 50 
            }).setMotion({
                position: tars[0],
                type: 'linear'
            });

            stars.push(sstar);
            // this.drawStars(stars);
            this.animate();
        },
        drawStars(array) {
            for(var i = 0;i<array.length;i++){
                array[i].render();
            }
        },
        testFn(){
            let ctx = this.setCanvas();
            this.drawLine(ctx);
        },
        setCanvas(){
            let stage = new Stage();
            let ctx = stage.ctx;

            this.stage = stage;
            this.ctx = ctx;

            return ctx;
        },
        drawLine(ctx){
            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.arc(50, 50, 50, 0, Math.PI*2);
            ctx.fill();
            ctx.restore();
        },
        imgLoad(img){
            let me = this;
            if(img.complete){
                me.img = img;
            }else{
                img.onload = function(){
                    me.img = img;
                };
            }
        }
    },
    mounted(){
        let img = document.querySelector('#star');
        this.imgLoad(img);
        this.ctx = this.setCanvas();
    },
    created(){

    },
    watch:{
        img(val){
            this.initStars(val);
        }
    }
};
</script>

