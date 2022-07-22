<template>
  <div id="main">
    <div id="settings">
      <p class="title">影像选择</p>
      <br />
      <el-select
        v-model="value"
        filterable
        placeholder="请选择影像"
        style="width: 100%"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <p class="title">图层设置</p>
      <br />
      <div id="left">
        <label for="check1">
          <input
            type="checkbox"
            name="chk"
            id="check1"
            v-model="checked[0]"
          /><span><span></span></span>&nbsp; 影像底图
        </label>
        <label for="check2">
          <input
            type="checkbox"
            name="chk"
            id="check2"
            v-model="checked[1]"
          /><span><span></span></span>&nbsp; 禁养区
        </label>
        <label for="check3">
          <input
            type="checkbox"
            name="chk"
            id="check3"
            v-model="checked[2]"
          /><span><span></span></span>&nbsp; 限养区
        </label>
        <label for="check4">
          <input
            type="checkbox"
            name="chk"
            id="check4"
            v-model="checked[3]"
          /><span><span></span></span>&nbsp; 养殖区
        </label>
        <label for="check5">
          <input
            type="checkbox"
            name="chk"
            id="check5"
            v-model="checked[4]"
          /><span><span></span></span>&nbsp; 筏式养殖
        </label>
        <label for="check6">
          <input
            type="checkbox"
            name="chk"
            id="check6"
            v-model="checked[5]"
          /><span><span></span></span>&nbsp; 网箱养殖
        </label>
      </div>
      <div id="right">
        <el-color-picker
          size="small"
          v-model="color[0]"
          show-alpha
          :predefine="predefineColors"
        >
        </el-color-picker>
        <el-color-picker
          size="small"
          v-model="color[1]"
          show-alpha
          :predefine="predefineColors"
        >
        </el-color-picker>
        <el-color-picker
          size="small"
          v-model="color[2]"
          show-alpha
          :predefine="predefineColors"
        >
        </el-color-picker>
        <el-color-picker
          size="small"
          v-model="color[3]"
          show-alpha
          :predefine="predefineColors"
        >
        </el-color-picker>
        <el-color-picker
          size="small"
          v-model="color[4]"
          show-alpha
          :predefine="predefineColors"
        >
        </el-color-picker>
      </div>
      <el-button type="primary">确认导出</el-button>
      <el-button>还原设置</el-button>
    </div>
    <div id="display">
      <img id='firstImg' src="@/assets/image.png">
      <img src="@/assets/pro.png" :style="`filter: drop-shadow(2740px 0 ${bgColor[0]});`">
      <img src="@/assets/res.png" :style="`filter: drop-shadow(2740px 0 ${bgColor[1]});`">
      <img src="@/assets/aqu.png" :style="`filter: drop-shadow(2740px 0 ${bgColor[2]});`">
      <img src="@/assets/rca.png" :style="`filter: drop-shadow(2740px 0 ${bgColor[3]});`">
      <img src="@/assets/cca.png" :style="`filter: drop-shadow(2740px 0 ${bgColor[4]});`">
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageDisplay",
  data: function () {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      value: "",
      checked: [false, false, false, false, false, false],
      color: [
        "rgba(100, 69, 0, 0.68)",
        "rgba(100, 69, 0, 0.68)",
        "rgba(100, 69, 0, 0.68)",
        "rgba(100, 69, 0, 0.68)",
        "rgba(100, 69, 0, 0.68)",
      ],
      predefineColors: ["#ff4500"],
      bgColor: [
        "rgba(83, 158, 213, 0)",
        "rgba(83, 158, 213, 0)",
        "rgba(83, 158, 213, 0)",
        "rgba(115, 178, 255, 1)",
        "rgba(83, 158, 213, 0)",
      ],
    };
  },
  methods: {

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
  padding: 50px;
  padding-bottom: 0;
  font-size: 20px;

  #settings {
    width: 220px;
    display: inline-block;
    margin-top: 20px;
    margin-right: 100px;
    // border: 1px solid black;
    .title {
      margin-top: 60px;
    }
    #left {
      display: inline-block;
      width: 150px;
      margin-right: 20px;
      // border: 1px solid black;
      margin-bottom: 60px;

      label {
        display: inline-block;
        width: 100px;
        text-align: left;
        line-height: 26px;
        font-size: 16px;
        margin-bottom: 14px;

        input {
          display: none;
          &:checked + span {
            border-color: rgb(64, 158, 255);
          }
          &:checked + span > span {
            opacity: 1;
          }
          + span {
            box-sizing: border-box;
            display: inline-block;
            width: 20px;
            height: 20px;
            padding: 2px;
            border: 2px solid #ccc;
            vertical-align: sub;
            margin-right: 5px;
            border-radius: 12px;

            > span {
              border-radius: 12px;
              display: inline-block;
              width: 12px;
              height: 12px;
              float: left;
              background: rgb(64, 158, 255);
              opacity: 0;
            }
          }
        }
      }
    }
    #right {
      display: inline-block;
      width: 40px;
      // border: 1px solid black;
      position: relative;
      top: 12px;
      & * {
        margin-bottom: 10px;
      }
    }
  }
  #display {
    width: 740px;
    height: 720px;
    position: absolute;
    top: 100px;
    display: inline-block;
    border: 4px solid rgb(185, 185, 185);

    img {
      max-width:100%;
      max-height:100%;
      position: absolute; 
      margin: auto;
      top: 50%; 
      left: 50%;
      transform: translate(-50%,-50%);
      
    }
    img:not(#firstImg) {
      left: -2000px;
      border-right: 740px solid transparent;
    }
  }
}
</style>
