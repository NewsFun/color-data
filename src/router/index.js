import Vue from 'vue';
import Router from 'vue-router';
import Canvas from '@/components/canvas';
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'canvas',
            component: Canvas
        },{
            path: '/hello-world',
            name: 'HelloWorld',
            component: HelloWorld
        }
    ]
});
