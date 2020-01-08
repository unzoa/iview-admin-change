import Vue from 'vue'

const apiArr = {
  'login': 'user/login/', // 登陆接口 post
  'logout': 'user/logout/' // 登出

  // 阅报
  // 系统
  // 上传
}

const api = {
  apiPath: () => {
    let apiPath = '//192.168.1.88/'
    if (!Vue.config.productionTip) {
      apiPath = window.location.protocol + '//' +
        window.location.hostname +
        (window.location.port ? ':' + window.location.port : '') + '/'
    }
    localStorage.setItem('downloadUrl', apiPath)

    return apiPath
  },
  apiArr: apiArr
}

Vue.prototype.$api = api
