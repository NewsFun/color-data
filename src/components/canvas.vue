<template>
    <canvas id="canvas">
        <img id="star" 
            src="../resources/flystar.png" 
            alt="">
    </canvas>
</template>
<script>
import Star from './fly-star';

const url = '../resources/flystar.png';
// const tars = [{x:100, y:200},{x:400, y:300}];
let stars = [];

export default {
    data(){
        return {
            img: null,
            canvas: null,
            ctx: null,
            H: window.innerHeight,
            W: window.innerWidth
        };
    },
    methods:{
        initPage(){
            let img = document.querySelector('#star');
            this.initStars(img);
        },
        initStars(img) {
            stars[0] = new Star({ wait:300, img: img, x:200, y:50 });
            stars[1] = new Star({ wait:60, img: img });
            this.drawStars(stars);
        },
        drawStars(array) {
            for(var i = 0;i<array.length;i++){
                // array[i].moveTo(tars[i]);
                array[i].render();
            }
        },
        testFn(){
            let ctx = this.setCanvas();
            this.drawLine(ctx);
            // this.drawSingleStar(this.img);
        },
        setCanvas(){
            const canvas = document.querySelector('#canvas');

            canvas.width = this.W;
            canvas.height = this.H;

            const ctx = canvas.getContext('2d');
            this.ctx = ctx;
            return ctx;
        },
        drawLine(ctx){
            ctx.save();
            ctx.fillStyle = '#fff';
            ctx.arc(50, 50, 50, 0, Math.PI*2);
            ctx.fill();
            ctx.restore();
        },
        drawSingleStar(img){
            this.ctx.drawImage(img, 100, 100);
        },
        imgLoad(img){
            let me = this;
            if(img.complete){
                this.img = img;
            }else{
                img.onload = function(){
                    me.img = this;
                };
            }
        }
    },
    mounted(){
        this.testFn();
        let img = document.querySelector('#star');
        this.imgLoad(img);
    },
    created(){

    },
    watch:{
        img(val){
            this.drawSingleStar(val);
        }
    }
};
</script>

