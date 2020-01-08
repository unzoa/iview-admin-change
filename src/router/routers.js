import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

function isUpload (name) {
  return localStorage.homeName === 'upload_page'
}

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },

  {
    path: isUpload() ? '/home_con' : '/',
    name: 'home_con',
    redirect: '/home',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '所有任务',
          icon: 'file'
        },
        component: () => import('@/view/home')
      }
    ]
  },

  {
    path: isUpload() ? '/' : '/upload',
    name: 'upload',
    redirect: '/upload_page',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: '/upload_page',
        name: 'upload_page',
        meta: {
          icon: 'upload',
          title: '上传文件'
        },
        component: () => import('@/view/upload/upload.vue')
      }
    ]
  },

  {
    path: '/system',
    name: 'system',
    component: Main,
    meta: {
      hideInBread: false,
      title: '系统管理',
      icon: 'setting'
    },
    children: [
      {
        path: 'haha',
        name: 'haha',
        meta: {
          icon: 'user',
          title: 'haha'
        },
        component: () => import('@/view/system/pages/haha.vue')
      },
      {
        path: 'lala',
        name: 'lala',
        meta: {
          icon: 'xianlu',
          title: 'lala'
        },
        component: () => import('@/view/system/pages/lala.vue')
      }
    ]
  },

  {
    path: '/audit',
    name: 'audit',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'audit_page',
        name: 'audit_page',
        meta: {
          icon: 'audit',
          title: '系统审计'
        },
        component: () => import('@/view/audit/audit.vue')
      }
    ]
  },

  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'file',
          title: route => `${route.params.id}`,
          notCache: true
          // beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'file',
          title: route => `${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  }
]
