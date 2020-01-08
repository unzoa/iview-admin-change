import Vue from 'vue'

const getCookie = (cookieName) => {
  let strCookie = document.cookie
  // 将多cookie切割为多个名/值对
  let arrCookie = strCookie.split('; ')
  let userId
  // 遍历cookie数组，处理每个cookie对
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split('=')
    // 找到名称为userId的cookie，并返回它的值
    if (cookieName === arr[0]) {
      userId = arr[1]
      break
    }
  }
  return unescape(userId)
}

const setCookie = (name, value) => {
  // 定义一天
  let days = 1
  let exp = new Date()
  // 定义的失效时间，
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
  // 写入Cookie  ，toGMTstring将时间转换成字符串。
  document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString
}

// 验证用户名
// 数字英文大小写
const userNameVertify = (name) => {
  var reg = new RegExp('^[A-Za-z0-9]+$')
  var rs = ''
  for (var i = 0; i < name.length; i++) {
    rs = rs + (reg.test(name.substr(i, 1)) ? name.substr(i, 1) : '')
  }
  return rs
}
// 验证密码
// 汉字、英文字母、数字、英文下划线
const tagName = (str) => {
  var reg = new RegExp('^[A-Za-z0-9_\u4e00-\u9fa5]+$')
  var rs = ''
  for (var i = 0; i < str.length; i++) {
    rs = rs + (reg.test(str.substr(i, 1)) ? str.substr(i, 1) : '')
  }
  return rs
}

// 验证文件名
const fileName = (str) => {
  if (/^[\w-.]+$/.test(str) && str.indexOf(' ') === -1) {
    return true
  }
  return false
}

const dateFormat = (val) => {
  var Time = val
  var choose = -1
  Time = String(Time).split('.')[0]
  if (/^(\d{10})$/.test(Time)) {
    // 时间戳
    choose = 1
  } else if (/^(((\d{4})[-](\d{1,2})[-](\d{1,2})))[T\s](\d{1,2}):(\d{1,2}):(\d{1,2})$/.test(Time)) {
    // 匹配 2018-11-28T00:12:40
    if (Time.indexOf(' ') > -1) {
      Time = Time.replace(' ', 'T')
    }
    choose = 0
  } else {
    choose = 0
  }
  if (choose === 0) {
    // 日期转换
    Time = new Date(Time)
    let o = [Time.getMonth() + 1, Time.getDate(), Time.getHours(), Time.getMinutes(), Time.getSeconds()]
    o.forEach((k, j) => {
      if (String(k).length === 1) {
        if (k !== 0) {
          o[j] = '0' + String(k)
        } else {
          o[j] = '00'
        }
      }
    })
    return Time.getFullYear() + '-' + o[0] + '-' + o[1] + ' ' + o[2] + ':' + o[3] + ':' + o[4]
  } else if (choose === 1) {
    // 时间戳转换
    if (Time) {
      var date = new Date(Time * 1000)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    } else {
      return '0000-00-00 00:00:00'
    }
  }
}

// 时间戳转换
const timestampToTime = (timestamp) => {
  var date = new Date(timestamp * 1000)
  var Y = (date.getFullYear() || 8888) + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + ((date.getMonth() || 87) + 1) : (date.getMonth() || 87) + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + (date.getDate() || 87) : (date.getDate() || 87)) + ' '
  var h = (date.getHours() < 10 ? '0' + (date.getHours() || 87) : (date.getHours() || 87)) + ':'
  var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes() || 87) : (date.getMinutes() || 87)) + ':'
  var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds() || 87) : (date.getSeconds() || 87))
  return Y + M + D + h + m + s
}

// obj arr 继承
const inheritObj = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// 后端传来的数据是一个非标准格式json的字符串，需要全部替换单引号为双引号的func
const formatJson = (str) => {
  if (str) {
    return JSON.parse(str.replace(/'/g, '"'))
  } else {
    return str
  }
}

const debounce = (func, delay) => {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 文件下载
const downloadFile = (url, callback) => {
  try {
    var elemIF = document.createElement('iframe')
    elemIF.src = localStorage.downloadUrl + url
    // elemIF.style.display = 'none'
    elemIF.setAttribute('frameborder', '0')
    document.body.appendChild(elemIF)
    if (callback) {
      callback()
    }
  } catch (e) {
    alert('下载异常!')
  }
}

const numberBeauty = (num) => {
  let n = num
  switch (true) {
    case num >= 1000 && num < 10000:
      n = (n / 1000).toFixed(1) + '千'
      break

    case num >= 10000 && num < 100000000:
      n = (n / 10000).toFixed(1) + '万'
      break

    case num >= 100000000:
      n = (n / 100000000).toFixed(1) + '亿'
      break

    default:
      break
  }
  return n
}

const newTab = (path, params) => {
  let urlParams = ''
  if (params) {
    Object.keys(params).forEach(i => {
      urlParams += `${i}=${params[i]}`
      urlParams += '&'
    })
  }
  window.open(window.location.protocol + '//' +
    window.location.hostname +
    (window.location.port ? ':' + window.location.port : '') +
    '/#/' + path + '?' + urlParams)
}

Vue.prototype.$utils = {
  getCookie,
  setCookie,
  userNameVertify,
  tagName,
  fileName,
  dateFormat,
  timestampToTime,
  inheritObj,
  formatJson,
  debounce,
  downloadFile,
  numberBeauty,
  newTab
}
