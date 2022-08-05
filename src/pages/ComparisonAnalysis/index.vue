<template>
  <div id="main">
    <div id="top">
      <el-select
        v-model="template"
        placeholder="请选择分析模板"
        style="margin-right: 40px; width: 300px"
      >
        <el-option
          v-for="i in options2"
          :key="i.value"
          :label="i.label"
          :value="i.value"
          style="margin-right: 0px"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="image"
        placeholder="请选择影像"
        style="margin-right: 40px; width: 300px"
        multiple
        collapse-tags
      >
        <el-option
          v-for="i in options1"
          :key="i.value"
          :label="i.label"
          :value="i.value"
          style="margin-right: 0px"
        >
        </el-option>
      </el-select>
      <el-button>确定</el-button>
    </div>
    <div id="middle">
      <div class="text">{{ text }}</div>
      <div id="chart">
        <div class="pic" ref="chart"></div>
        <div class="pic" ref="chart2"></div>
      </div>
    </div>
    <div id="bottom">
      <el-button type="primary" style="margin-right: 40px" @click="exportWord()"
        >导出</el-button
      >
      <el-button type="danger">重置</el-button>
    </div>
  </div>
</template>

<script>
import JSZipUtils from "jszip-utils";
import docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import PizZip from "pizzip";
let Echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/sunburst"); //按需引入
require("echarts/lib/component/legend");
require("echarts/lib/component/title");
export default {
  name: "ComparisonAnalysis",
  data: function () {
    return {
      download: {
        charts1: "",
        charts2: "",
        data: {
          id: 1,
          imageTgzName: "LC81190412013296LGN01",
          collectTime: "2013-10-23",
          processStatus: "已处理",
          longitudeRange: "119.81°-119.96°E",
          latitudeRange: "26.60°-26.70°N",
          rangeArea: 100,
          ndwiArea: 80,
          proArea: 40,
          resArea: 30,
          aquArea: 10,
          rcaArea: 20,
          rcaCount: 100,
          ccaArea: 20,
          ccaCount: 100,
          rcaProArea: 10,
          rcaProCount: 50,
          ccaProArea: 10,
          ccaProCount: 50,
          rcaResArea: 5,
          rcaResCount: 25,
          ccaResArea: 5,
          ccaResCount: 25,
          allArea: 40, // 之后选择数据时要计算出这两个字段
          allCount: 200,
        },
      },
      chart: null,
      chart2: null,
      image: [],
      template: "",
      options1: [
        {
          value: "1",
          label: "LC81190412013296LGN01",
        },
        {
          value: "2",
          label: "LC81190412013297LGN01",
        },
      ],
      options2: [
        {
          value: "选项1",
          label: "养殖构成",
        },
        {
          value: "选项2",
          label: "养殖变化",
        },
      ],
      tableData: [
        {
          id: 1,
          imageTgzName: "LC81190412013296LGN01",
          collectTime: "2013-10-23",
          processStatus: "已处理",
          longitudeRange: "119.81°-119.96°E",
          latitudeRange: "26.60°-26.70°N",
          rangeArea: 100,
          ndwiArea: 80,
          proArea: 40,
          resArea: 30,
          aquArea: 10,
          rcaArea: 20,
          rcaCount: 100,
          ccaArea: 20,
          ccaCount: 100,
          rcaProArea: 10,
          rcaProCount: 50,
          ccaProArea: 10,
          ccaProCount: 50,
          rcaResArea: 5,
          rcaResCount: 25,
          ccaResArea: 5,
          ccaResCount: 25,
        },
      ],
    };
  },
  methods: {
    echarts() {
      //初始化chart
      this.chart = Echarts.init(this.$refs.chart);
      const item1 = {
        color: "rgb(225, 118, 120)",
      };
      const item2 = {
        color: "rgb(231, 141, 138)",
      };
      const item3 = {
        color: "rgb(237, 164, 156)",
      };
      const item4 = {
        color: "rgb(125, 170, 205)",
      };
      const item5 = {
        color: "rgb(161, 202, 232)",
      };
      //配置数据

      let option = {
        title: {
          text: "养殖面积组成情况",
          x: "center",
          y: "bottom",
          textStyle: {
            fontSize: 16,
          },
        },
        series: {
          radius: ["25%", "80%"],
          type: "sunburst",
          animation: false,
          sort: undefined,
          emphasis: {
            focus: "ancestor",
          },
          data: [
            {
              name: "禁养区",
              children: [
                {
                  name: "筏式",
                  value: this.tableData[0].rcaProArea,
                  itemStyle: item4,
                },
                {
                  name: "网箱",
                  value: this.tableData[0].ccaProArea,
                  itemStyle: item5,
                },
              ],
              itemStyle: item1,
            },
            {
              name: "限养区",
              children: [
                {
                  name: "筏式",
                  value: this.tableData[0].rcaResArea,

                  itemStyle: item4,
                },
                {
                  name: "网箱",
                  value: this.tableData[0].ccaResArea,

                  itemStyle: item5,
                },
              ],
              itemStyle: item2,
            },
            {
              name: "养殖区",
              children: [
                {
                  name: "筏式",
                  value:
                    this.tableData[0].rcaArea -
                    this.tableData[0].rcaProArea -
                    this.tableData[0].rcaResArea,

                  itemStyle: item4,
                },
                {
                  name: "网箱",
                  value:
                    this.tableData[0].ccaArea -
                    this.tableData[0].ccaProArea -
                    this.tableData[0].ccaResArea,

                  itemStyle: item5,
                },
              ],
              itemStyle: item3,
            },
          ],
          label: {
            rotate: "radial",
          },
          levels: [],
          itemStyle: {
            color: "#ddd",
            borderWidth: 2,
          },
        },
      };
      // 传入数据
      this.chart.setOption(option);
      this.download.charts1 = this.chart.getDataURL({
        type: "png", // 导出的格式，可选 png, jpeg
        pixelRatio: 2, // 导出的图片分辨率比例，默认为 1。
        // backgroundColor: string,// 导出的图片背景色，默认使用 option 里的 backgroundColor
        // excludeComponents: Array.<string>  // 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox'],一般也忽略了'toolbox'这栏就够了
      });

      //初始化chart2
      this.chart2 = Echarts.init(this.$refs.chart2);
      //配置数据
      let option2 = {
        title: {
          text: "养殖数量组成情况",
          x: "center",
          y: "bottom",
          textStyle: {
            fontSize: 16,
          },
        },
        series: {
          radius: ["25%", "80%"],
          type: "sunburst",
          animation: false,
          sort: undefined,
          emphasis: {
            focus: "ancestor",
          },
          data: [
            {
              name: "禁养区",
              children: [
                {
                  name: "筏式",
                  value: this.tableData[0].rcaProCount,
                  itemStyle: item4,
                },
                {
                  name: "网箱",
                  value: this.tableData[0].ccaProCount,
                  itemStyle: item5,
                },
              ],
              itemStyle: item1,
            },
            {
              name: "限养区",
              children: [
                {
                  name: "筏式",
                  value: this.tableData[0].rcaResCount,
                  itemStyle: item4,
                },
                {
                  name: "网箱",
                  value: this.tableData[0].ccaResCount,
                  itemStyle: item5,
                },
              ],
              itemStyle: item2,
            },
            {
              name: "养殖区",
              children: [
                {
                  name: "筏式",
                  value:
                    this.tableData[0].rcaCount -
                    this.tableData[0].rcaProCount -
                    this.tableData[0].rcaResCount,
                  itemStyle: item4,
                },
                {
                  name: "网箱",
                  value:
                    this.tableData[0].ccaCount -
                    this.tableData[0].ccaProCount -
                    this.tableData[0].ccaResCount,
                  itemStyle: item5,
                },
              ],
              itemStyle: item3,
            },
          ],
          label: {
            rotate: "radial",
          },
          levels: [],
          itemStyle: {
            color: "#ddd",
            borderWidth: 2,
          },
        },
      };
      // 传入数据
      this.chart2.setOption(option2);
      this.download.charts2 = this.chart2.getDataURL({
        type: "png", // 导出的格式，可选 png, jpeg
        pixelRatio: 2, // 导出的图片分辨率比例，默认为 1。
        // backgroundColor: string,// 导出的图片背景色，默认使用 option 里的 backgroundColor
        // excludeComponents: Array.<string>  // 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox'],一般也忽略了'toolbox'这栏就够了
      });
    },
    base64DataURLToArrayBuffer(dataURL) {
      const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
      if (!base64Regex.test(dataURL)) {
        return false;
      }
      const stringBase64 = dataURL.replace(base64Regex, "");
      let binaryString;
      if (typeof window !== "undefined") {
        binaryString = window.atob(stringBase64);
      } else {
        binaryString = new Buffer(stringBase64, "base64").toString("binary");
      }
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes.buffer;
    },
    // 导出word
    exportWord() {
      //这里要引入处理图片的插件，下载docxtemplater后，引入的就在其中了
      var ImageModule = require("docxtemplater-image-module-free");
      var that = this;
      //这里是我的Word路径，在static文件下
      JSZipUtils.getBinaryContent("/temp.docx", function (error, content) {
        if (error) {
          throw error;
        }
        let opts = {};
        opts.centered = true;
        opts.fileType = "docx";
        opts.getImage = (tag) => {
          return that.base64DataURLToArrayBuffer(tag);
        };
        opts.getSize = () => {
          return [300, 300]; //这里可更改输出的图片宽和高
        };
        let zip = new PizZip(content);
        let doc = new docxtemplater();
        doc.attachModule(new ImageModule(opts));
        doc.loadZip(zip);
        doc.setData({
          ...that.download, //我的最外层包裹一切要导出的数据名称
        });
        try {
          doc.render();
        } catch (error) {
          var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
          };
          console.log(
            JSON.stringify({
              error: e,
            })
          );
          throw error;
        }
        var out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        saveAs(out, "test.docx");
      });
    },
  },
  computed: {
    text() {
      let res = [],
        data = this.download.data;
      res[0] = `影像名称：${data.imageTgzName}`;
      res[1] = `采集时间：${data.collectTime}`;
      res[2] = `经度范围：${data.longitudeRange}`;
      res[3] = `纬度范围：${data.latitudeRange}`;
      res[4] = `养殖情况：该影像总面积为 ${
        data.rangeArea
      } 平方千米，其中水域面积 ${data.ndwiArea} 平方千米，禁养区面积 ${
        data.proArea
      } 平方千米，限养区面积 ${data.resArea} 平方千米，养殖区面积 ${
        data.aquArea
      } 平方千米。该区域养殖总面积 ${
        data.rcaArea + data.ccaArea
      } 平方千米，养殖数量 ${
        data.rcaCount + data.ccaCount
      } 个，具体构成如下图所示。`;
      return res.join(" \n ");
    },
  },
  mounted() {
    this.echarts();
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
  font-size: 18px;

  #top {
    margin: 20px 160px;
  }
  #middle {
    width: 946px;
    height: 610px;
    padding: 30px 76px 0;
    box-shadow: 0px 0px 5px rgb(230, 230, 230);
    border: 1px solid rgb(219, 219, 219);
    border-radius: 6px;
    margin: 30px 0 20px;
    overflow-y: auto;
    font-size: 16px;
    white-space: pre-line; // 识别换行
    line-height: 2;

    #chart {
      display: flex;
      justify-content: center;

      .pic {
        display: inline-block;
        height: 300px;
        width: 300px;
        margin: 20px 0 0;
        // border: 1px solid rgb(219, 219, 219);
      }
    }
  }
  #bottom {
    display: flex;
    justify-content: center;
  }
}
</style>
