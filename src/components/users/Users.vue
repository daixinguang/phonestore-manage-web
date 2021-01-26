<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/users' }">用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片-->
    <el-card class="box-card">
      <!--添加和搜索-->
      <el-row type="flex" justify="space-between">
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialogVisible = true">添加用户</el-button>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!--数据表格-->
      <el-table :data="tableUserData" border stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="电话">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="removeUserById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-row type="flex" justify="end">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-row>
    </el-card>
    <!--添加用户对话框-->
    <el-dialog title="添加用户" :visible.sync="addUserDialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="addUserForm" status-icon :rules="addUserRoles" ref="addUserFormRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="addUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addUserForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addUserForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addUserFormRef')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 内容主体 -->
      <el-form :model="editUserForm" ref="editUserFormRef" :rules="editUserFormRules" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editUserForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    // 自定义邮箱规则
    const validateEmail = (rule, value, callback) => {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback()
      }
      callback(new Error('请输入合法邮箱'))
    }
    // 自定义手机号规则
    const validatePhone = (rule, value, callback) => {
      const regMobile = /^1[35678]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }
    return {
      // 获取用户列表查询参数对象
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 5
      },
      total: 0, // 共多少条
      tableUserData: [{
        name: '',
        email: '',
        phone: ''
      }],
      addUserDialogVisible: false,
      addUserForm: {
        username: '',
        password: '123456',
        email: '1@qq.com',
        phone: '18713154101'
      },
      addUserRoles: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: validateEmail,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            validator: validatePhone,
            trigger: 'blur'
          }
        ]
      },
      editDialogVisible: false,
      editUserForm: {},
      editUserFormRules: {
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: validateEmail,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            validator: validatePhone,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 编辑用户信息
    async showEditDialog (id) {
      const { data: res } = await this.$http.get('user/query/' + id)
        .catch(err => {
          this.$message.error('查询用户信息失败！')
          return err
        })
      this.editUserForm = res
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed () {
      this.$refs.editUserFormRef.resetFields()
    },
    // 修改用户信息
    editUser: function () {
      // 提交请求前，表单预验证
      this.$refs.editUserFormRef.validate(async valid => {
        // console.log(valid)
        // 表单预校验失败
        if (!valid) return
        try {
          await this.$http.put(
            'user/update/' + this.editUserForm.id, this.$qs.stringify({
              email: this.editUserForm.email,
              phone: this.editUserForm.phone
            }))
          // 隐藏添加用户对话框
          this.editDialogVisible = false
          this.$message.success('更新用户信息成功！')
          this.getUserList()
        } catch (e) {
          this.$message.error('更新用户信息失败！')
        }
      })
    },
    // 删除用户信息
    async removeUserById (id) {
      const confirmResult = await this.$messageBox.confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      try {
        await this.$http.delete('user/delete/' + id)
        this.$message.success('删除用户成功！')
        this.getUserList()
      } catch (e) {
        this.$message.error('删除用户失败！')
      }
    },
    // 监听 pagesize改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听 页码值 改变事件
    handleCurrentChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagenum = newSize
      this.getUserList()
    },
    // 获取User表
    async getUserList () {
      try {
        const { data: res } = await this.$http.get('user/query', {
          params: this.queryInfo
        })
        this.tableUserData = res.items
        this.total = res.total
      } catch (e) {
        return this.$message.error('获取用户列表失败！')
      }
    },
    // 关闭对话框
    handleClose (done) {
      this.$messageBox.confirm('确认关闭？关闭后清空表单')
        .then(_ => {
          this.$refs.addUserFormRef.resetFields()
          done()
        })
        .catch(_ => {
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return false
        try {
          await this.$http.post('user/register', this.$qs.stringify(this.addUserForm))
          // 关闭对话框
          this.addUserDialogVisible = false
          // 重置表单
          this.$refs.addUserFormRef.resetFields()
          this.$message.success('添加用户成功！')
        } catch (e) {
          this.$message.error('添加用户失败！')
          console.log(e)
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
