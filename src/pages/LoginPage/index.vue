<template>
  <div id="login">
    <p id="system">近海养殖区监测系统</p>
    <el-form
      id="form"
      ref="user"
      :model="user"
      label-width="60px"
      label-position="right"
    >
      <el-form-item label="用户名">
        <el-input
          v-model="user.name"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <label slot="label">密&nbsp;&nbsp;码&nbsp;</label>
        <el-input
          v-model="user.password"
          placeholder="请输入密码"
          show-password
          prefix-icon="el-icon-lock"
        ></el-input>
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
import {userLogin} from '@/api'
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
    async onSubmit() {
      let name = this.user.name
      let password = this.user.password
      if (!name || !password) {
        this.$message.error('用户名或密码不能为空');
        return
      }
      let res = await userLogin({'name': name, 'password': password})
      // console.log(res)
      if (res.code === 200) {
        localStorage.setItem("name", res.data.name)
        localStorage.setItem("authority", res.data.authority)
        localStorage.setItem("token", res.data.token)
        PubSub.publish("changeActive", 0);
      } else {
        this.$message.error({
          duration: 2000,
          message: res.msg,
        });
      }
    },
  },
};
</script>

<style scoped lang='less'>
#login {
  background-color: white;
  width: 500px;
  height: 480px;
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
  margin-top: 46px;
  margin-left: 63px;
}
</style>
