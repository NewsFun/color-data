<template>
    <canvas id="canvas" ref="canvas">
        <img id="star" 
            src="../resources/flystar.png" 
            style="display:none" 
            alt="">
    </canvas>
</template>
<script>
import {Stage} from './fly-star';
import {Star} from './star';

const tars = [{x:100, y:200},{x:400, y:300}];
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
        initStars(img) {
            stars[0] = new Star({ wait:300, img: img, x:200, y:50 });
            stars[1] = new Star({ wait:60, img: img });
            this.drawStars(stars);
        },
        drawStars(array) {
            for(var i = 0;i<array.length;i++){
                array[i].moveTo(tars[i]).render(this.ctx);
            }
        },
        testFn(){
            let ctx = this.setCanvas();
            this.drawLine(ctx);
        },
        setCanvas(){
            const ctx = new Stage().ctx;
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

