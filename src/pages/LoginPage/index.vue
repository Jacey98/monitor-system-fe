<template>
  <div id="login">
    <p id="system">近海养殖区智能监测系统</p>
    <el-form
      id="form"
      ref="user"
      :model="user"
      label-width="60px"
      label-position="right"
    >
      <el-form-item label="用户名">
        <el-input v-model="user.name" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <label slot="label">密&nbsp;&nbsp;码&nbsp;</label>
        <el-input v-model="user.password" placeholder="请输入密码" show-password prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item id="btn">
        <el-button type="primary" @click="onSubmit"
          >&nbsp;&nbsp;&nbsp;登&nbsp;&nbsp;录&nbsp;&nbsp;&nbsp;</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data: function () {
    return {
      user: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      PubSub.publish("changeActive", 0);
    },
  },
};
</script>

<style scoped lang='less'>
#login {
  background-color: white;
  width: 360px;
  height: 340px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  margin-top: 18vh;
  padding: 70px;
  box-shadow: 20px 20px 20px rgb(219, 219, 219);
  border-radius: 6px;
}
#system {
  margin-top: 16px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
#form {
  margin-top: 60px;
  padding-right: 20px;
}
.el-form-item {
  padding-top: 10px;
}
#btn {
  margin-top: 40px;
  margin-left: 63px;
}
</style>
