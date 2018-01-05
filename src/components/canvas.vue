<template>
    <canvas id="canvas">
        <img id="star" 
            src="../resources/flystar.png" 
            style="display:none" 
            alt="">
    </canvas>
</template>
<script>
import axios from 'axios';
import Star from './fly-star';

const url = '../resources/flystar.png';
const tars = [{x:100, y:200},{x:400, y:300}];
var stars = [];

export default {
    data(){
        return {
            img: null
        };
    },
    methods:{
        initPage(){
            // this.testFn();
            let img = document.querySelector('#star');
            this.img = img;
            // this.initStars(img);
        },
        initStars(img) {
            console.log(img);
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
            const canvas = document.querySelector('#canvas');
            const W = window.innerWidth;
            const H = window.innerHeight;

            canvas.width = W;
            canvas.height = H;

            const ctx = canvas.getContext('2d');
            
            ctx.drawImage(img, 100, 100);  
        }
    },
    mounted(){
        this.initPage();
    },
    created(){
        
    },
    watch:{
        img(val){
            console.log(val);
            this.initStars(val);
        }
    }
};
</script>

