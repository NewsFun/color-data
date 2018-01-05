<template>
    <canvas id="canvas">
        <img id="star" 
            src="../resources/flystar.png" 
            alt="">
    </canvas>
</template>
<script>
// import axios from 'axios';
import Star from './fly-star';

const url = '../resources/flystar.png';
// const tars = [{x:100, y:200},{x:400, y:300}];
let stars = [];

export default {
    data(){
        return {
            img: null,
            canvas: null
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
        testFn(img){
            const canvas = document.querySelector('#canvas');
            const W = window.innerWidth;
            const H = window.innerHeight;

            canvas.width = W;
            canvas.height = H;

            const ctx = canvas.getContext('2d');
            
            // let img = document.querySelector('#star');
            ctx.drawImage(img, 100, 100);
        }
    },
    mounted(){
        this.img = document.querySelector('#star');
    },
    created(){
        
    },
    watch:{
        img(val){
            this.testFn(val);
        }
    }
};
</script>

