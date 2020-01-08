import Vue from 'vue'

// 组件列表

// 第三方组件

const components = []

components.forEach(i => {
  Vue.component(i.name, i)
})
