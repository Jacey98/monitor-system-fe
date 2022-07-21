<template>
  <div>
    <div id="head">
      <p id="left">近海养殖区智能监测系统</p>
      <ul id="middle">
        <li @click="changeActive(0, $event)" :class="activeObj[0]">
          <a href="#">首页</a>
        </li>
        <li @click="changeActive(1, $event)" :class="activeObj[1]">
          <a href="#">影像展示</a>
        </li>
        <li @click="changeActive(2, $event)" :class="activeObj[2]">
          <a href="#">影像管理</a>
        </li>
        <li @click="changeActive(3, $event)" :class="activeObj[3]">
          <a href="#">养殖预警</a>
        </li>
        <li @click="changeActive(4, $event)" :class="activeObj[4]">
          <a href="#">对比分析</a>
        </li>
      </ul>
      <!-- <p id="right">{{ userName }}</p> -->
      <el-dropdown id="right">
        <span class="el-dropdown-link">
          {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户管理</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  data: function () {
    return {
      userName: "admin",
      activeObj: {
        0: "showActive",
        1: "showDisactive",
        2: "showDisactive",
        3: "showDisactive",
        4: "showDisactive",
      },
    };
  },
  methods: {
    changeActive(index) {
      this.activeObj = {
        0: "showDisactive",
        1: "showDisactive",
        2: "showDisactive",
        3: "showDisactive",
        4: "showDisactive",
      };
      this.activeObj[index] = "showActive";
    },
  },
};
</script>

<style scoped lang='less'>
#head {
  height: 60px;
  line-height: 58px;
  background-color: white;
  box-shadow: 1px 1px 1px rgb(219, 219, 219);
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  font-size: 17px;

  & * {
    transition: 0.3s;
  }
  #left {
    font-size: 22px;
    font-weight: bold;
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
    font-weight: bold;
    font-size: 17px;
  }
}
</style>
