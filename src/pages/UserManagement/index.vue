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
        <el-form-item label="用户ID" required>
          <el-input
            type="number"
            v-model="form.id"
            placeholder="请输入8位数字"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录名" required>
          <el-input v-model="form.name" placeholder="请输入登录名"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" required>
          <el-input
            v-model="form.password"
            placeholder="请输入登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户权限" required>
          <el-select v-model="form.authority" style="width: 300px" required>
            <el-option
              v-for="i in options"
              :key="i.value"
              :label="i.label"
              :value="i.value"
              style="margin-right: 0px"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleAdd">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
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
        @click="change(item.id)"
        >{{ state }}</el-button
      >
      <el-button type="danger" plain @click="deleteUser(item.id)"
        >删 除</el-button
      >
    </span>
  </div>
</template>

<script>
import { userAllUsers } from "@/api";
import { userUserChange } from "@/api";
import { userNewUser } from "@/api";
import { userDeleteUser } from "@/api";
export default {
  name: "UserManagement",
  data: function () {
    return {
      user: [
        // {
        //   id: "120220001",
        //   name: "admin",
        //   password: "safsdfdd",
        //   authority: "管理员",
        // },
        // {
        //   id: "120220002",
        //   name: "admin2",
        //   password: "safsdfdd",
        //   authority: "管理员",
        // },
        // {
        //   id: "120220003",
        //   name: "admin3",
        //   password: "safsdfdd",
        //   authority: "管理员",
        // },
        // {
        //   id: "220220004",
        //   name: "user",
        //   password: "safsdfdd",
        //   authority: "普通用户",
        // },
        // {
        //   id: "220220005",
        //   name: "user2",
        //   password: "safsdfdd",
        //   authority: "普通用户",
        // },
        // {
        //   id: "120220003",
        //   name: "admin3",
        //   password: "safsdfdd",
        //   authority: "管理员",
        // },
        // {
        //   id: "220220004",
        //   name: "user1",
        //   password: "safsdfdd",
        //   authority: "普通用户",
        // },
        // {
        //   id: "220220005",
        //   name: "user2",
        //   password: "safsdfdd",
        //   authority: "普通用户",
        // },
      ],
      options: [
        {
          value: "管理员",
          label: "管理员",
        },
        {
          value: "普通用户",
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
    async getAllUsers() {
      let res = await userAllUsers();
      if (res.code === 200) {
        this.user = res.data;
      } else {
        this.$message.error({
          duration: 2000,
          message: res.msg,
        });
      }
    },
    async newUser(data) {
      let res = await userNewUser(data);
      if (res.code === 200) {
        this.getAllUsers();
        this.cancleAdd();
      } else {
        this.$message.error({
          duration: 2000,
          message: res.msg,
        });
      }
    },
    async userChange(data) {
      let res = await userUserChange(data);
      if (res.code === 200) {
        this.$message.success({
          duration: 2000,
          message: res.msg,
        });
        this.getAllUsers();
      } else {
        this.$message.error({
          duration: 2000,
          message: res.msg,
        });
      }
    },
    deleteUser(data) {
      this.$confirm("确认删除吗？", "提示", {
        iconClass: "el-icon-question", //自定义图标样式
        confirmButtonText: "确认", //确认按钮文字更换
        cancelButtonText: "取消", //取消按钮文字更换
        type: "warning", //提示类型
      }).then(async () => {
        let res = await userDeleteUser({ id: data });
        if (res.code === 200) {
          this.$message.success({
            duration: 2000,
            message: res.msg,
          });
          this.getAllUsers();
        } else {
          this.$message.error({
            duration: 2000,
            message: res.msg,
          });
        }
      });
    },
    cancleAdd() {
      this.dialogFormVisible = false;
      this.form = {
        id: "",
        name: "",
        password: "",
        authority: "",
      };
    },
    submitAdd() {
      if (
        this.form.id &&
        this.form.name &&
        this.form.password &&
        this.form.authority
      ) {
        if (String(this.form.id).length !== 8) {
          this.$message.error({
            duration: 2000,
            message: "用户ID必须为8位数字",
          });
          return;
        }
        if (this.user.findIndex((item) => item.id == this.form.id) !== -1) {
          this.$message.error({
            duration: 2000,
            message: "该用户ID已存在",
          });
          return;
        }
        let data = { ...this.form };
        data.authority = data.authority === "管理员" ? 1 : 2;
        this.newUser(data);
      } else {
        this.$message.error({
          duration: 2000,
          message: "请完整填写数据",
        });
      }
    },
    change(id) {
      this.adit = !this.adit;
      if (this.adit) {
        this.state = "编 辑";
        this.mood = "mask";
        let item = { ...this.user.find((v) => v.id === id) };
        item.authority = item.authority === "管理员" ? 1 : 2;
        this.userChange(item);
      } else {
        this.state = "完 成";
        this.mood = "";
      }
      // this.$forceUpdate();
    },
  },
  created() {
    this.getAllUsers();
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
