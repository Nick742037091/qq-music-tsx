import { createApp } from 'vue'
// TODO 如何实现导入less文件名的提示
import '@/styles/main.less'
import App from './App'
import store from '@/store'
import '@/mock/index'

createApp(App).use(store).mount('#app')