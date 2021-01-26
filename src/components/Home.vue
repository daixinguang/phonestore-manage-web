<template>
  <el-container class="home-container">
    <!--顶部header-->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="">
        <span>PhoneStore后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!--左侧导航栏Aside-->
      <el-aside width="200px">
        <el-menu background-color="#3a5169" text-color="#fff" active-text-color="#03C2E6" unique-opened router :default-active="this.$route.path">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
              <i class="el-icon-user"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/brands">
              <i class="el-icon-menu"></i>
              <span>品牌列表</span>
            </el-menu-item>
            <el-menu-item index="/goods">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/orders">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="/reports">
              <i class="el-icon-data-analysis"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧内容主体-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      // 左侧菜单数据
      menulist: []
    }
  },
  created () {
  },
  methods: {
    logout () {
      window.sessionStorage.clear()// 清空session
      this.$router.push('/login')// 重定向
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #344a5f;
  color: #333;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;

  > div {
    display: flex;
    align-items: center;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #eee;
    }

    span {
      color: #eee;
      margin-left: 10px;
    }
  }
}

.el-aside {
  background-color: #2c3e50;
  color: #333;
  text-align: center;
  line-height: 200px;

  .el-menu {
    border-right: 0;
  }
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 100%;
}
</style>
