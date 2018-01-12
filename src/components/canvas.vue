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
import { Stage } from './stage';

const tars = [
    { x:200, y:400 },
    { x:500, y:500 },
    { x:100, y:300 },
    { x:200, y:50 }
];
const moveList = [
    {
        endPos: tars[0],
        type: 'linear',
        wait: 30,
        ve: 10
    },{
        endPos: tars[1],
        type: 'linear',
        ve: 5
    },{
        endPos: tars[2],
        type: 'linear',
        ve: 10
    },{
        endPos: tars[3],
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
        initStars(img) {
            let sam = this.stage.setActors({
                key:'star1',
                img: img, 
                coord:{
                    x: 200,
                    y: 50
                }
            }).setMotion(moveList);
            // console.log(sam);
            this.stage.animate();
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

