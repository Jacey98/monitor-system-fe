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
      <el-button type="primary" @click="exportPic()">确认导出</el-button>
      <el-button>还原设置</el-button>
    </div>
    <div id="display">
      <div id="inner">
        <img v-show="checked[0]" id="firstImg" src="@/assets/image.png" />
        <canvas v-show="checked[1]" id="canvas1"></canvas>
        <!-- <img
          v-show="checked[1]"
          src="@/assets/pro.png"
          :style="`filter: drop-shadow(2740px 0 ${color[0]});`"
        />
        <img
          v-show="checked[2]"
          src="@/assets/res.png"
          :style="`filter: drop-shadow(2740px 0 ${color[1]});`"
        />
        <img
          v-show="checked[3]"
          src="@/assets/aqu.png"
          :style="`filter: drop-shadow(2740px 0 ${color[2]});`"
        />
        <img
          v-show="checked[4]"
          src="@/assets/rca.png"
          :style="`filter: drop-shadow(2740px 0 ${color[3]});`"
        />
        <img
          v-show="checked[5]"
          src="@/assets/cca.png"
          :style="`filter: drop-shadow(2740px 0 ${color[4]});`"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
import html2Canvas from "html2canvas";
export default {
  name: "ImageDisplay",
  data: function () {
    return {
      options: [
        {
          value: "LC81190412013296LGN01",
          label: "LC81190412013296LGN01",
        },
        {
          value: "LC81190412013297LGN01",
          label: "LC81190412013297LGN01",
        },
      ],
      value: "LC81190412013296LGN01",
      checked: [true, false, false, false, false, false],
      color: [
        "rgba(255, 127, 127, 0.5)",
        "rgba(255, 235, 175, 0.5)",
        "rgba(115, 178, 255, 0.5)",
        "rgba(115, 178, 255, 1)",
        "rgba(255, 127, 127, 1)",
      ],
      predefineColors: ["#ff4500"],
    };
  },
  methods: {
    exportPic() {
      html2Canvas(document.querySelector("#test")).then((canvas) => {
        let dataURL = canvas.toDataURL("image/png");
        if (dataURL !== "") {
          let eleLink = document.createElement("a");
          eleLink.download = this.value; // 命名
          eleLink.href = dataURL;
          eleLink.click();
        }
      });
    },
    canvasInit(id, png) {
      let newCanvas = document.querySelector("#" + id);
      let image = new Image();
      let ctx = newCanvas.getContext("2d");
      console.log(1);
      image.onload = () => {
        console.log(2);
        ctx.drawImage(image, 0, 0, image.width, image.height);
        let imageData = ctx.getImageData(
          0,
          0,
          newCanvas.width,
          newCanvas.width
        );
        //获取到每个像素的信息
        let px = imageData.data;
        let color = this.color[0].slice(5, -1);
        console.log(color);
        for (let i = 0; i < px.length; i += 4) {
          px[i] = 30; //r
          px[i + 1] = 30; //g
          px[i + 2] = 30; //b
        }
        ctx.putImageData(imageData, 0, 0);
      };
      image.src = png;

      // let newCanvas = document.querySelector("#canvas");
      // let image = new Image();
      // // image.src = document.querySelector("#test").src;
      // // image.src = document.querySelector("#firstImg").src;

      // let ctx = newCanvas.getContext("2d");

      // image.onload = function () {
      //   ctx.drawImage(image, 0, 0, image.width, image.height);
      //   // newCanvas.width = image.width;
      //   // newCanvas.height = image.height;
      //   // newCanvas
      //   //   .getContext("2d")
      //   //   .drawImage(image, 0, 0, image.width, image.height);
      // };
      // let imageData = ctx.getImageData(0, 0, newCanvas.width, newCanvas.width);
      // //获取到每个像素的信息
      // let px = imageData.data;
      // console.log(px);
      // for (let i = 0; i < px.length; i += 4) {
      //   px[i] = 100; //r
      //   px[i + 1] = 100; //g
      //   px[i + 2] = 100; //b
      //   px[i + 3] = 255; //b
      // }
      // console.log(imageData.data);
      // // ctx = newCanvas.getContext("2d");
      // // let matrix_obj = ctx.createImageData(newCanvas.width, newCanvas.height);
      // // matrix_obj.data.set(imageData);
      // // ctx.putImageData(matrix_obj, 0, 0);
      // ctx.putImageData(imageData, 0, 0);
      // var dataUri = newCanvas.toDataURL("image/png");
      // var link = document.createElement("a");
      // link.href = dataUri;
      // link.download = "icon.png";
      // link.click();
    },
  },
  mounted() {
    this.canvasInit("canvas1", "@/assets/pro.png");
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
    border: 2px solid rgb(189, 199, 219);

    #inner {
      width: 100%;
      height: 100%;

      canvas {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
      }
      img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        margin: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      img:not(#firstImg, #test) {
        left: -2000px;
        border-right: 740px solid transparent;
      }
    }
  }
}
</style>
