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
        <el-menu background-color="#3a5169" text-color="#fff" active-text-color="#03C2E6" unique-opened router>
          <!-- 一级菜单-->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconClass[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
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
      menulist: [],
      iconClass: {
        125: 'el-icon-user-solid',
        103: 'el-icon-suitcase',
        101: 'el-icon-shopping-bag-1',
        102: 'el-icon-shopping-cart-2',
        145: 'el-icon-s-data'
      }
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()// 清空session
      this.$router.push('/login')// 重定向
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
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
