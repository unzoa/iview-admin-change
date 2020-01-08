import '@/api/api.js'
import '@/libs/js'

import './static.js'
import './components.js'

export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '阅报系统',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: localStorage.homeName // 'home'
}
