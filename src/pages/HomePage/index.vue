<template>
  <div id="main">
    <!-- <button @click='subActive(-1, $event)'>a</button> -->
    <div id="nav">
      <span @click="subActive(1, $event)" class="pic"
        ><i class="el-icon-s-platform"></i><span>影 像 展 示</span></span
      >
      <span @click="subActive(2, $event)" class="pic"
        ><i class="el-icon-s-tools"></i><span>影 像 管 理</span></span
      >
      <span @click="subActive(3, $event)" class="pic"
        ><i class="el-icon-s-opportunity"></i><span>养 殖 预 警</span></span
      >
      <span @click="subActive(4, $event)" class="pic"
        ><i class="el-icon-s-marketing"></i><span>对 比 分 析</span></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data: function () {
    return {};
  },
  methods: {
    subActive(index) {
      PubSub.publish("changeActive", index);
    },
  },
};
</script>

<style scoped lang='less'>
#main {
  min-height: 100%;
  background-color: white;

  #nav {
    margin: auto;
    margin-top: 18vh;
    width: 80vw;
    height: 500px;
    padding: 40px;
    display: flex;
    justify-content: space-between;

    .pic {
      cursor: pointer;
      width: 240px;
      height: 240px;
      display: inline-block;
      background-color: rgb(240, 241, 245);
      border-radius: 10px;
      padding-top: 55px;

      & * {
        font-size: 100px;
        color: rgb(172, 172, 172);
        display: block;
        text-align: center;
        // margin: auto;
      }
      span {
        margin-top: 40px;
        font-size: 26px;
        color: rgb(102, 101, 101);
      }
    }
  }
}
</style>
