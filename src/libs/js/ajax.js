import Vue from 'vue'
import Axios from 'axios'

const This = Vue.prototype
const ApiPath = This.$api.apiPath()
const ApiArr = This.$api.apiArr

const TOKEN = () => {
  return localStorage[This.$projectEnName + '_token']
}

// 请求拦截器
Axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
Axios.interceptors.response.use(
  (response) => {
    let data
    if (response.data) {
      data = response.data
    } else {
      data = response
    }

    // 401 跳转到login
    if (data.status === 401) {
      // 清理信息存储
      localStorage.setItem(This.$projectEnName + '_token', '')
      localStorage.setItem('userName', 'undefined')

      This.$utils.setCookie(This.$projectEnName + '_token', '')
      This.$utils.setCookie('token_refresh_exp', '')
      This.$utils.setCookie('token_exp', '')

      // cannot read property _router of undefined (This)
      // router 存在于Vue实例中，此时401应该至少到了main.vue中了
      // 实例已经创建完成了，但是还是未获取到？？？？？？
      // This.$router.push({path: '/Login'})

      window.location.href =
        window.location.protocol + '//' +
        window.location.hostname +
        (window.location.port ? ':' + window.location.port : '') +
        '/#/Login'
    }
    return data
  },
  (error) => {
    return Promise.reject(error)
  }
)

const ajax = {

  post: (Interface, requestData = {}) => {
    return Axios.post(ApiPath + ApiArr[Interface], requestData, {
      transformRequest: [function (requestData) { // 转换数据格式，有待测试传送文件的方式时候同样可行。
        requestData.token = TOKEN()
        requestData.submit_user = localStorage.userName

        let ret = ''
        for (let it in requestData) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(requestData[it]) + '&'
        }
        ret = ret.slice(0, ret.length - 1)
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },

  get: (Interface, requestData = {}) => {
    requestData.token = TOKEN()
    requestData.submit_user = localStorage.userName

    // return ajax.tokenDate().then((tokenRes) => {
    //   if (Interface !== 'guestLogin') {
    //     requestData.token = This.$utils.getCookie(This.$projectEnName + '_token')
    //   }
    return Axios.get(ApiPath + ApiArr[Interface], {
      params: requestData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    // })
  },

  // 请求接口时判断token是否过期
  tokenDate: () => {
    var p = new Promise(function (resolve) {
      // 当前请求时间
      let nowTime = Date.parse(new Date()) / 1000
      // token刷新时间
      let expTime = Number(This.$utils.getCookie('token_exp'))
      // token过期时间
      let refreshExpTime = Number(This.$utils.getCookie('token_refresh_exp'))
      // 当前请求时间小于刷新token时间并且大于token过期时间，刷新token
      if (nowTime >= expTime && nowTime < refreshExpTime) {
        ajax.post('refreshtoken', {username: This.$utils.getCookie('userName')}).then((res) => {
          if (res.status === 1) {
            This.$utils.setCookie(This.$projectEnName + '_token', res.token)
            This.$utils.setCookie('token_exp', res.token_exp)
            resolve()
          }
        })
      // 当前请求时间大于token刷新时间，重新登录
      } else if (nowTime >= refreshExpTime) {
        This.$utils.setCookie(This.$projectEnName + '_token', '')
        This.$utils.setCookie('token_refresh_exp', '')
        This.$utils.setCookie('token_exp', '')
        resolve()
      } else {
        resolve()
      }
    })
    return p
  },

  upload: (Interface, formData, config) => {
    formData.append('token', TOKEN())
    formData.append('submit_user', localStorage.userName)

    return new Promise((resolve, reject) => {
      Axios.post(ApiPath + ApiArr[Interface], formData, config).then((res) => {
        if (res) {
          resolve(res)
        }
      }).catch((res) => {
        resolve(res)
      })
    })
  },

  blob: (Interface, requestData = {}) => {
    let configOri = {
      params: requestData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'blob'
    }
    // 这里取 split 是为了适应检测历史详情的title操作
    requestData.token = TOKEN()
    requestData.submit_user = localStorage.userName

    return Axios.get(ApiPath + ApiArr[Interface], configOri)
      .then(r => {
        return window.URL.createObjectURL(new Blob([r]))
      })
  }
}

Vue.prototype.$ajax = ajax
