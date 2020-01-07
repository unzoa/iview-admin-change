# Read Email System
> 根据 iview-admin 二次开发

## 改造Step
- step-1
  + 改变router

- step-2
  + 处理动态路由
    - 点击消息list展示详情，扩大详情展示区域（增加tab标签）
    - **参数：动态路由匹配(需要把某种模式匹配到的所有路由，全都映射到同个组件)**

- step-3
  + 处理首页为消息中心，需要src/config/index下默认打开的首页的路由name值，默认home

- step-4
  + 删除多余文件
  + 清理package.json

- step-5
  + 梳理文件

- step-6
  + 注销mock数据
  + 处理路由拦截 router.beforeEach
  + 处理login登录事件