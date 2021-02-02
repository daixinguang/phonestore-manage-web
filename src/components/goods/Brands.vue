<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/users' }">品牌列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片-->
    <el-card class="box-card">
      <!--添加和搜索-->
      <el-row type="flex" justify="space-between">
        <el-col :span="4">
          <el-button type="primary" @click="addBrandDialogVisible = true">添加品牌</el-button>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getBrandList">
            <el-button slot="append" icon="el-icon-search" @click="getBrandList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!--数据表格-->
      <el-table :data="tableBrandData" border stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="品牌">
        </el-table-column>
        <el-table-column prop="image" label="商标logo">
          <template slot-scope="scope">
            <el-image :src="scope.row.image"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="removeBrandById(scope.row.id)"></el-button>
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
    <!--对话框-->
    <!--添加品牌对话框-->
    <el-dialog title="添加品牌" :visible.sync="addBrandDialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="addBrandForm" status-icon ref="addBrandFormRef" label-width="100px">
        <el-form-item label="品牌" prop="name">
          <el-input type="text" v-model="addBrandForm.name" autocomplete="off" style="width: 360px;"></el-input>
        </el-form-item>
        <el-form-item label="商标" prop="image">
          <!--          <el-input v-model="addBrandForm.image" autocomplete="off"></el-input>-->
          <el-upload
            drag
            action="upload/image"
            :on-success="uploadSuccess"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer">
    <el-button @click="addBrandDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addBrand">确 定</el-button>
  </span>
    </el-dialog>
    <!--修改品牌对话框-->
    <el-dialog title="修改品牌信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 内容主体 -->
      <el-form :model="editBrandForm" ref="editbrandFormRef" label-width="70px">
        <el-form-item label="品牌" prop="name">
          <el-input v-model="editBrandForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商标" prop="image">
          <!--          <el-input v-model="editBrandForm.image"></el-input>-->
          <el-image :src="editBrandForm.image"></el-image>
          <el-upload
            drag
            show-file-list="false"
            action="upload/image"
            :on-success="editImageSuccess"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editbrand">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Brands',
  data () {
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
      tableBrandData: [{
        brand: '',
        image: ''
      }],
      addBrandDialogVisible: false,
      addBrandForm: {
        name: '联想（Lenovo）',
        image: ''
      },
      editDialogVisible: false,
      editBrandForm: {
        name: '',
        image: ''
      }
    }
  },
  created () {
    this.getBrandList()
  },
  methods: {
    editImageSuccess (res) {
      this.$message.success('上传图片成功')
      this.editBrandForm.image = res
    },
    // 获取上传照片地址
    uploadSuccess (res) {
      this.$message.success('上传图片成功')
      this.addBrandForm.image = res
    },
    // 删除用户信息
    async removeBrandById (id) {
      const confirmResult = await this.$messageBox.confirm(
        '此操作将永久删除该品牌, 是否继续?',
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
        await this.$http.delete('item/brand/delete/' + id)
        this.$message.success('删除品牌成功！')
        this.getBrandList()
      } catch (e) {
        this.$message.error('删除品牌失败！')
      }
    },
    // 修改品牌信息
    async editbrand () {
      try {
        await this.$http.put('item/brand/update/' + this.editBrandForm.id, this.$qs.stringify(this.editBrandForm))
        // 隐藏添加用户对话框
        this.editDialogVisible = false
        this.$message.success('更新品牌信息成功！')
        this.getBrandList()
      } catch (e) {
        this.$message.error('更新品牌信息失败！')
      }
    },
    // 编辑品牌信息
    async showEditDialog (id) {
      // 根据当前 id 查询数据
      const { data: res } = await this.$http.get('item/brand/query/' + id)
        .catch(err => {
          this.$message.error('查询用户信息失败！')
          return err
        })
      this.editBrandForm = res
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed () {
      this.$refs.editbrandFormRef.resetFields()
    },
    // 监听 pagesize改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getBrandList()
    },
    // 监听 页码值 改变事件
    handleCurrentChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagenum = newSize
      this.getBrandList()
    },
    // 获取Brand表
    async getBrandList () {
      try {
        const { data: res } = await this.$http.get('item/brand/query', {
          params: this.queryInfo
        })
        this.tableBrandData = res.items
        this.total = res.total
      } catch (e) {
        return this.$message.error('获取品牌列表失败！')
      }
    },
    // 关闭添加品牌对话框
    handleClose (done) {
      this.$messageBox.confirm('确认关闭？关闭后清空表单')
        .then(_ => {
          this.$refs.addBrandFormRef.resetFields()
          done()
        })
        .catch(_ => {
        })
    },
    // 添加品牌
    async addBrand () {
      try {
        await this.$http.post('item/brand/create', this.$qs.stringify(this.addBrandForm))
        // 关闭对话框
        this.addBrandDialogVisible = false
        // 重置表单
        this.$refs.addBrandFormRef.resetFields()
        this.$message.success('添加品牌成功！')
        this.getBrandList()
      } catch (e) {
        this.$message.error('添加品牌失败！')
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
