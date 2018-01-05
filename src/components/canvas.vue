<template>
    <!-- <img src="../resources/flystar.png" alt=""> -->
    <canvas id="canvas"></canvas>
</template>
<script>
import axios from 'axios';
import Star from './fly-star';

const url = '../resources/flystar.png';
const tars = [{x:100, y:200},{x:400, y:300}];

var img = new Image();
img.src = url;

var stars = [];

export default {
    data(){
        return {
            img: null
        };
    },
    methods:{
        initPage(){
            this.initStars();
        },
        initStars() {
            stars[0] = new Star({ wait:300, img: img });
            stars[1] = new Star({ wait:60, img: img });
            this.drawStars(stars);
        },
        drawStars(array) {
            for(var i = 0;i<array.length;i++){
                array[i].moveTo(tars[i]);
            }
        }
    },
    mounted(){
        img.onload = function(){
            this.initPage();
        }
    },
    created(){
        
    }
};
</script>

