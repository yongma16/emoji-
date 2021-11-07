<template>
<div id='app'>
    <Home msg="表情包搜索" />
</div>
</template>

<script>
import {
    onMounted
} from 'vue'
// import CanvasNest from 'canvas-nest.js'

import Home from './components/Home.vue'

export default {
    name: 'App',
    components: {
        Home
    },
    setup() {
        onMounted(() => {
            // const config = {
            //     color: '255,0,0',
            //     count: 88,
            // };
            // const element = {
            //     color: '0,0,255',
            //     opacity: 0.7,
            //     zIndex: -2,
            //     count: 99,
            // }
            // // Using config rendering effect at 'element'.
            // const cn = new CanvasNest(element, config);
            // // destroy
            // cn.destroy();
        })
        return {}
    }
}
</script>

<style>
#app {
    position: relative;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding:0;
    margin:0;
    width:100%;
    height:100%;
    /* padding: 10px; */
    background: #076585;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #fff, #076585);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #fff, #076585);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>
