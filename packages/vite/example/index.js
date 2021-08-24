import { str } from './moduleA.js'
console.log("vite......" + str)

// // support third-party library
import { createApp, h } from 'vue'
// const App = {
//     render() {
//         return h('div', null, [h('div', null, String('Toby Vite'))])
//     }
// }
import App from './App.vue'
import './index.css'
createApp(App).mount('#app')