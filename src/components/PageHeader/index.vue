<template>
  <div id="head">
    <p id="left">近海养殖区智能监测系统</p>
    <ul id="middle">
      <li @click="changeActive(0, 0, $event)" :class="activeArr[0]">
        <a href="#">首页</a>
      </li>
      <li @click="changeActive(0, 1, $event)" :class="activeArr[1]">
        <a href="#">影像展示</a>
      </li>
      <li @click="changeActive(0, 2, $event)" :class="activeArr[2]">
        <a href="#">影像管理</a>
      </li>
      <li @click="changeActive(0, 3, $event)" :class="activeArr[3]">
        <a href="#">养殖预警</a>
      </li>
      <li @click="changeActive(0, 4, $event)" :class="activeArr[4]">
        <a href="#">对比分析</a>
      </li>
    </ul>
    <el-dropdown id="right" @command="handleCommand">
      <span class="el-dropdown-link"
        ><a href="#"> {{ userName }}</a
        ><i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="5">用户管理</el-dropdown-item>
        <el-dropdown-item command="6">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- <router-view style='fontSize:100px;'></router-view> -->
  </div>
</template>

<script>
import PubSub from "pubsub-js";
export default {
  name: "PageHeader",
  data: function () {
    return {
      userName: "admin",
      activeArr: [
        "showActive",
        "showDisactive",
        "showDisactive",
        "showDisactive",
        "showDisactive",
      ],
    };
  },
  methods: {
    changeActive(_, index) {
      let pre = this.activeArr.indexOf("showActive");
      if (pre !== -1) this.activeArr.splice(pre, 1, "showDisactive");
      if (index !== 5 && index !== 6)
        this.activeArr.splice(index, 1, "showActive");
      let map = {
        0: "HomePage",
        1: "ImageDisplay",
        2: "ImageManagement",
        3: "AquacultureWarning",
        4: "ComparisonAnalysis",
        5: "UserManagement",
        6: "LoginPage",
      };
      this.$router.push({
        name: map[index],
      });
    },
    handleCommand(command) {
      this.changeActive(0, +command);
    },
  },
  mounted() {
    this.pid = PubSub.subscribe("changeActive", this.changeActive); //订阅消息
  },
  beforeDestroy() {
    PubSub.unsubscribe(this.pid);
  },
};
</script>

<style scoped lang='less'>
#head {
  height: 60px;
  width: 100%;
  line-height: 58px;
  background-color: white;
  box-shadow: 1px 1px 1px rgb(219, 219, 219);
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  position: fixed;

  & * {
    transition: 0.3s;
  }
  #left {
    font-size: 22px;
    font-weight: bold;
    margin-left: 30px;
  }
  #middle {
    padding-right: 6vw;
    color: black;

    & * {
      display: inline-block;
      margin: 0 18px;
      text-decoration: none;
    }
    li {
      box-sizing: border-box;
    }
    .showActive {
      border-bottom: 2px solid rgb(64, 158, 255);
      a {
        color: black;
      }
    }
    .showDisactive {
      border-bottom: 2px solid rgb(255, 255, 255);
    }
    a:hover {
      color: black;
    }
  }
  #right {
    font-size: 17px;
    color: #666666;
    margin-right: 30px;

    & * {
      text-decoration: none;
    }
    a:hover {
      color: black;
    }
  }
}
</style>
