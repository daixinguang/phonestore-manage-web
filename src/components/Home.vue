<template>
    <div>
      <el-button type="info" @click="logout">退出</el-button>
    </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logout () {
      window.sessionStorage.clear()// 清空session
      this.$router.push('/login')// 重定向
    }
  }
}
</script>

<style scoped>

</style>
