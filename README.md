# System
> 根据 [iview-admin](https://github.com/iview/iview-admin) 二次开发

### src目录结构
```
├── api
|   ├── api.js
├── assets
|   ├── icons [iconfont图标库]
├── components
|   ├── main [项目布局文件]
├── config
|   ├── components [公用组件注册]
|   └── static [图片等静态文件注册]
├── libs
|   ├── js [引入公司模块库]
|       ├── ajax.js [请求文件]
|       ├── backspace.js [防止edge backspace按钮回退路由]
|       ├── getRelativepath.js [上传文件夹的目录树解析]
|       └── utils.js [公司的函数库]
|   ├── tools.js
|   └── util.js
├── router
|   ├── before-close.js [路由关闭前操作]
|   ├── routers.js [路由对象]
|   └── index.js [路由]
├── store [vuex]
|── view
|   ├── argu-page [动态路由]
|   ├── audit [审计]
|   ├── home [阅报]
|   ├── login [登录]
|   ├── system [系统]
|   └── upload [上传]
```

### iconfont
- 阿里图标库，创建账户和项目
- 将图标库查找所需图标加入购物车，并移入现有项目
- 在项目中更改edit-icon, 修改font-class
- 最后download code

- 应用案例 demo_index.html

- main.js 中引入iconfont.css

### 登录后主页问题
> 由于config中设置的 homeName 作为功用变量，在各个模块中应用

在login后判断用户类型，注册用户的主页字段到localStorage.homeName；
利用window.location.href 定向到主页，重新加载一遍配置文件，进而注册主页；
routers.js 判断主页的路由的path为 '/'。
