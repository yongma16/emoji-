<template>
<div id='app'>

    <a-layout style="width:100%;height:100%;padding:0">
        <a-layout>
            <a-layout-header style="background:#076585;text-align:left;padding:0;box-shadow:5px 5px 20px rgba(0,0,0,.1);">
                <a-menu v-model:selectedKeys="current" mode="horizontal" style="margin:0;">
                    <a-menu-item key="home">
                        <template #icon>
                            <HomeOutlined />
                            <mail-outlined />
                        </template>
                        博客主页
                    </a-menu-item>
                    <a-menu-item key="imgSearch">
                        <template #icon>
                            <SearchOutlined />
                        </template>
                        图片搜索
                    </a-menu-item>
                    <a-menu-item key="github">
                        <template #icon>
                            <GithubOutlined />
                        </template>
                        github
                    </a-menu-item>
                    <a-menu-item key="codeChina">
                        <template #icon>
                            <mail-outlined />
                        </template>
                        yma16(codeChina)
                    </a-menu-item>
                    <!-- style="float:right;position: absolute;" -->
                    <a-menu-item key="writer">
                        <template #icon>
                            <a-avatar src="http://yongma16.xyz/static/emoji/imgs/yma16.jpg" />
                        </template>
                        yma16
                    </a-menu-item>
                </a-menu>
            </a-layout-header>
            <a-layout-content style="padding:10px;background:url('http://yongma16.xyz/static/emoji/imgs/background.jpg')">
                <Home msg="表情包搜索" />
            </a-layout-content>
            <a-layout-footer style="box-shadow:5px 5px 20px rgba(0,0,0,.2);">
                <div class="footer_font">
                    Copyright &copy;2021 yongma16.xyz
                    <!-- &nbsp;&nbsp;&nbsp;浏览量:{{readCount}} -->
                </div>
            </a-layout-footer>
        </a-layout>
    </a-layout>
</div>
</template>

<script>
import {
    MailOutlined
} from '@ant-design/icons-vue'
import {
    GithubOutlined,
    HomeOutlined,
    SearchOutlined
} from '@ant-design/icons-vue';
import {
    onMounted,
    ref,
    watch
} from 'vue'
// import CanvasNest from 'canvas-nest.js'

import Home from './components/Home.vue'

export default {
    name: 'App',
    components: {
        Home,
        MailOutlined,
        GithubOutlined,
        HomeOutlined,
        SearchOutlined
    },
    setup() {
        onMounted(() => {

        })
        const current = ref(['imgSearch'])
        watch(() => {
                current.value
            },
            () => {
                console.log('current', current.value[0])
                if (current.value) {
                    jumpPage(current.value[0])
                }
            }, {
                deep: true,
                immediate: false
            }
        )
        const jumpPage = (value) => {
            console.log('value',value,typeof(value))
            switch (value) {
                case 'home':
                    window.open('http://yongma16.xyz/');
                    break;
                case 'github':
                    window.open('https://github.com/yongma16/emoji-search')
                    break;
                case 'codeChina':
                    window.open('https://codechina.csdn.net/qq_38870145/myblogvue')
                    break;
                case 'writer':
                    window.open('https://blog.csdn.net/qq_38870145')
                    break;
                default:
                    break;
            }
        }
        return {
            current,
            jumpPage
        }

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
    /* color: #2c3e50; */
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
    /* padding: 10px; */
    /* background: #076585; */
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #fff, #076585);
    /* Chrome 10-25, Safari 5.1-6 */
    /* background: linear-gradient(to top, #fff, #076585); */
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.footer_font {
    position: relative;
    top: 25%;
    /* height: 100%; */
    margin: 0;
    padding: 0;
    font-weight: 200;
}
</style>
