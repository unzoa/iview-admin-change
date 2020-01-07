<template>
  <div>
    <i-button @click="addTag">addTags</i-button>
  </div>
</template>

<script>
export default {
  name: 'home',

  data () {
    return {
    }
  },
  methods: {
    addTag () {
      this.$router.push({
        name: 'params',
        params: {
          id: Math.random().toFixed(3) * 1000
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
