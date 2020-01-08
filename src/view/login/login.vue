<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
export default {
  components: {
    LoginForm
  },
  methods: {
    handleSubmit ({ userName, password }) {
      switch (userName) {
        case 'user':
          localStorage.setItem('homeName', 'home')
          break

        case 'upload':
          localStorage.setItem('homeName', 'upload_page')
          break
      }

      // 需要项目重新加载config
      window.location.href =
        window.location.protocol + '//' +
        window.location.hostname +
        (window.location.port ? ':' + window.location.port : '') + '/'
    }
  }
}
</script>

<style>

</style>
