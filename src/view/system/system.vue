<template>
  <div class="system-con">
    system
    <ul>
      <li @click="jump('haha')">haha</li>
      <li @click="jump('lala')">lala</li>
    </ul>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'system',

  methods: {
    jump (name) {
      this.$router.push({name: name})
    }
  }
}
</script>
