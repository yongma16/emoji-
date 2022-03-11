import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import less from 'less'

createApp(App).use(less)
    .use(Antd)
    .mount('#app')