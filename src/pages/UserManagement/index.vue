<template>
  <div id="main">
    <span id="set"
      ><el-button type="text" @click="dialogFormVisible = true"
        >+ 新增用户</el-button
      ></span
    >
    <!-- 新增用户对话框-->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="340px">
      <el-form :model="form">
        <el-form-item label="用户ID">
          <el-input v-model="form.id" placeholder="请输入8位数字"></el-input>
        </el-form-item>
        <el-form-item label="登录名">
          <el-input v-model="form.name" placeholder="请输入登录名"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="form.password" placeholder="请输入登录密码"></el-input>
        </el-form-item>
        用户权限<br />
        <el-select
          v-model="form.authority"
          style="margin-top: 10px; width: 300px"
        >
          <el-option
            v-for="i in options"
            :key="i.value"
            :label="i.label"
            :value="i.value"
            style="margin-right: 0px"
          >
          </el-option>
        </el-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <span class="list" v-for="(item, index) in user" :key="item.id">
      <p id="mask" :class="mood"></p>
      用户ID<el-input disabled v-model="item.id"> </el-input> 登录名<el-input
        v-model="item.name"
      >
      </el-input>
      登录密码<el-input v-model="item.password" show-password></el-input>
      用户权限<el-select v-model="item.authority" style="width: 240px">
        <el-option
          v-for="i in options"
          :key="i.value"
          :label="i.label"
          :value="i.value"
          style="margin-right: 0px"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        plain
        style="margin-right: 81px"
        @click="change"
        >{{ state }}</el-button
      >
      <el-button type="danger" plain>删 除</el-button>
    </span>
  </div>
</template>

<script>
export default {
  name: "UserManagement",
  data: function () {
    return {
      user: [
        {
          id: "18888888",
          name: "zsafsafa",
          password: "safsdfdd",
          authority: "管理员",
        },
        {
          id: "28888888",
          name: "zsafsafa",
          password: "safsdfdd",
          authority: "管理员",
        },
        {
          id: "38888888",
          name: "zsafsafa",
          password: "safsdfdd",
          authority: "管理员",
        },
      ],
      options: [
        {
          value: "选项1",
          label: "管理员",
        },
        {
          value: "选项2",
          label: "普通用户",
        },
      ],
      adit: true,
      state: "编 辑",
      mood: "mask",
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
        password: "",
        authority: "",
      },
      formLabelWidth: "100px",
    };
  },
  methods: {
    change() {
      this.adit = !this.adit;
      if (this.adit) {
        this.state = "编 辑";
        this.mood = "mask";
      } else {
        this.state = "完 成";
        this.mood = "";
      }
      // this.$forceUpdate();
    },
  },
};
</script>

<style scoped lang='less'>
#main {
  width: 1200px;
  min-height: 100%;
  background-color: white;
  margin: auto;
  box-shadow: 0px 0px 10px rgb(219, 219, 219);
  padding: 50px 80px;
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  font-size: 16px;

  #set * {
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  > span {
    display: inline-block;
    width: 240px;
    height: 384px;
    padding: 30px 46px;
    box-shadow: 0px 0px 5px rgb(230, 230, 230);
    border: 1px solid rgb(219, 219, 219);
    border-radius: 6px;
    margin: 6px;
    position: relative;

    .mask {
      position: absolute;
      display: inline-block;
      top: 0;
      left: 0;
      width: 100%;
      height: 80%;
      z-index: 2;
    }
    > *:not(#mask) {
      margin-top: 6px;
      margin-bottom: 16px;
    }
  }
  .list:last-child {
    margin-right: auto;
  }
}
</style>
