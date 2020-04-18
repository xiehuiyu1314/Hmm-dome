<template>
  <div class="subjectModel">
    <el-dialog :visible.sync="dialogFormVisible" width="30%">
      <div slot="title" class="title">{{status == "新增"?"新增学科":"编辑"}}</div>
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>

      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addSubject, editSubject } from "@/api/subject.js";
export default {
  props: {
    status: {
      type: String,
      default: "新增"
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科编号", trigger: "blur" }]
      }
    };
  },
  methods: {
    //确认按钮
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.status == "新增") {
            addSubject(this.form).then(() => {
              this.$message.success("添加成功");
              this.dialogFormVisible = false;
              this.$parent.search();
            });
          } else {
            editSubject(this.form).then(() => {
              this.$message.success("编辑成功");
              this.dialogFormVisible = false;
              this.$parent.search();
            });
          }
        } else {
          this.$message.warning("白痴！");
        }
      });
    },
    //取消按钮
    resetForm() {
      this.dialogFormVisible = false;
      this.$refs.form.resetFields();
    }
  },
  // 点击新增时 重置表单
  watch: {
    dialogFormVisible(val) {
      if (val) {
        if (this.status == "新增") {
          this.form = {
            rid: "",
            name: "",
            short_name: "",
            intro: "",
            remark: ""
          };
          //该页面未用到 change 表单验证，不需要加这个
          // 坑点：页面一加载点击新增调用该方法会报错，因为页面一加载form表单还没被渲染
          // this.$nextTick(() => {
          //   this.$refs.form.resetFields();
          // });
        }
      }
    }
  }
};
</script>

<style lang="less">
.subjectModel {
  .el-dialog__header {
    padding: 0;
  }
  .title {
    height: 53px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 53px;
    background: linear-gradient(
      225deg,
      rgba(20, 147, 250, 1),
      rgba(1, 198, 250, 1)
    );
  }
  .el-dialog__footer {
    text-align: center;
  }
}
</style>