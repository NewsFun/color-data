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
const moveList = [
    {
        position: tars[0],
        type: 'linear',
        wait: 30,
        ve: 10
    },{
        position: tars[1],
        type: 'linear',
        ve: 5
    }
];
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
            let star1 = new Star({ 
                ctx: this.ctx,
                img: img, 
                coord:{
                    x: 200, 
                    y: 50 
                }
            }).setMotion(moveList);

            let star2 = new Star({ 
                ctx: this.ctx,
                img: img, 
                coord: {
                    x: 50, 
                    y: 50 
                }
            });
            // console.log(sstar);
            stars.push(star1);
            stars.push(star2);
            // this.drawStars(stars);
            this.animate();
        },
        drawStars(array) {
            for(var i = 0;i<array.length;i++){
                array[i].render();
            }
        },
        setCanvas(){
            let stage = new Stage();
            let ctx = stage.ctx;

            this.stage = stage;
            this.ctx = ctx;

            return ctx;
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

