<template>
  <div class="subject">
    <!-- 头部卡片 -->
    <el-card>
      <el-form :model="form" ref="form" inline label-width="80px">
        <el-form-item prop="rid" label="学科编号">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="学科名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="创建者">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option value="0" label="禁用"></el-option>
            <el-option value="1" label="启用"></el-option>
          </el-select>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="info" @click="clear">清除</el-button>
          <el-button type="primary" @click="addSubject">+新增</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 内容区域 -->
    <el-card class="card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="100px">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="update_time" label="创建日期"></el-table-column>
        <el-table-column label="状态" width="100px">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status == 0}">{{scope.row.status == 0?"禁止":"启用"}}</div>
          </template>
        </el-table-column>

        <!-- 按钮操作模块 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="info"
              @click="setStatus(scope.row.id)"
            >{{scope.row.status == 1?"禁止":"启用"}}</el-button>
            <el-button size="mini" type="danger" @click="removeSubject(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页按钮 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.page"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="form.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="form.total"
      ></el-pagination>
    </el-card>

    <!-- 弹框区域 -->
    <subjectModel ref="model" :status="status"></subjectModel>
  </div>
</template>

<script>
import subjectModel from "./subjectModel";
import { subjectList, setStatus, removeSubject } from "@/api/subject.js";

export default {
  components: { subjectModel },
  data() {
    return {
      status: "新增",
      tableData: [],
      form: {
        rid: "",
        name: "",
        status: "",
        username: "",
        page: 1,
        limit: 2,
        total: 40
      }
    };
  },
  methods: {
    //编辑学科
    edit(row) {
      this.status = "编辑";
      this.$refs.model.form = JSON.parse(JSON.stringify(row));
      this.$refs.model.dialogFormVisible = true;
    },
    //新增学科
    addSubject() {
      this.status = "新增";
      this.$refs.model.dialogFormVisible = true;
    },
    //删除学科
    removeSubject(id) {
      removeSubject({ id }).then(() => {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.search();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      });
    },
    //设置状态
    setStatus(id) {
      setStatus({ id }).then(() => {
        this.$message.success("状态设置成功");
        this.getSubject();
      });
    },
    // 分页按钮
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.form.limit = val;
      this.search();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.form.page = val;
      this.getSubject();
    },
    //搜索按钮
    search() {
      this.form.page = 1;
      this.getSubject();
    },
    // 清除按钮
    clear() {
      this.$refs.form.resetFields();
      this.getSubject();
    },
    //获取学科信息
    getSubject() {
      subjectList(this.form).then(res => {
        // console.log(res);
        this.tableData = res.data.items;
        this.form.total = res.data.pagination.total;
      });
    }
  },
  //获取学科信息
  created() {
    this.getSubject();
  }
};
</script>

<style lang="less">
.subject {
  .card {
    margin-top: 20px;

    .red {
      color: red;
    }
    .el-pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>