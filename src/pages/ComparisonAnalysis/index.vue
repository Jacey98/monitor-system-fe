<template>
  <div id="main">
    <div id="top">
      <el-select
        v-model="template"
        placeholder="请选择分析模板"
        style="margin-right: 40px; width: 300px"
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
      <el-select
        v-model="image"
        placeholder="请选择影像"
        style="margin-right: 40px; width: 300px"
        collapse-tags
        multiple
        :multiple-limit="template === '选项2' ? 0 : 1"
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
      <el-button @click="generateWord()">确定</el-button>
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
      <el-button type="danger" @click="clear()">重置</el-button>
    </div>
  </div>
</template>

<script>
import { imageAllImages } from "@/api";
import JSZipUtils from "jszip-utils";
import docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import PizZip from "pizzip";
// let Echarts = require("echarts/lib/echarts");
let Echarts = require("echarts");
require("echarts/lib/chart/sunburst"); //按需引入
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/component/legend");
require("echarts/lib/component/title");
export default {
  name: "ComparisonAnalysis",
  data: function () {
    return {
      template: "",
      options1: [
        {
          value: "选项1",
          label: "养殖构成",
        },
        {
          value: "选项2",
          label: "养殖变化",
        },
      ],
      image: [],
      options2: [
        // {
        //   value: "1",
        //   label: "LC81180422015023LGN00",
        // },
        // {
        //   value: "2",
        //   label: "LC81190412013297LGN01",
        // },
      ],
      allData: [],
      text: "",
      chart: null,
      chart2: null,
      tableData: [
        // {
        // collectTime: "2015-01-23",
        // rcaArea: 11.26,
        // ccaArea: 0.12,
        // allArea: 165.67,
        // rcaCha,
        // ccaCha,
        // },
      ],
      download: {
        charts1: "",
        charts2: "",
        data: {
          // collectTimeMin,
          // collectTimeMax,
          // longitudeRange,
          // latitudeRange,
          // areaMaxTime,
          // areaMax,
          // areaMinTime,
          // areaMin,
          // rcaChaMaxTime,
          // rcaChaMax,
          // rcaChaMinTime,
          // rcaChaMin,
          // ccaChaMaxTime,
          // ccaChaMax,
          // ccaChaMinTime,
          // ccaChaMin,
        },
      },
    };
  },
  methods: {
    async getAllImages() {
      let res = await imageAllImages();
      if (res.code === 200) {
        this.allData = res.data;
      } else {
        this.$message.error({
          duration: 2000,
          message: res.msg,
        });
      }
    },
    generateWord() {
      if (!this.template) {
        this.$message.error({
          duration: 2000,
          message: "请选择分析模板",
        });
        return;
      }
      if (!this.image.length) {
        this.$message.error({
          duration: 2000,
          message: "请选择影像",
        });
        return;
      }
      if (this.template === "选项2" && this.image.length <= 1) {
        this.$message.error({
          duration: 2000,
          message: "请至少选择两个影像",
        });
        return;
      }
      if (this.chart) this.chart.clear();
      if (this.chart2) this.chart2.clear();
      if (this.template === "选项1") {
        this.download.data = {
          ...this.allData.find((v) => v.imageTgzName === this.image[0]),
        };
        this.download.data.imageTgzName =
          this.download.data.imageTgzName.replace(/[\r\n]*/g, "");
        this.download.data.allArea =
          this.download.data.rcaArea + this.download.data.ccaArea;
        this.download.data.allArea = this.download.data.allArea.toFixed(3);
        this.download.data.allCount =
          this.download.data.rcaCount + this.download.data.ccaCount;

        let res = [],
          data = this.download.data;
        res[0] = `影像名称：${data.imageTgzName}`;
        res[1] = `采集时间：${data.collectTime}`;
        res[2] = `经度范围：${data.longitudeRange}`;
        res[3] = `纬度范围：${data.latitudeRange}`;
        res[4] = `养殖情况：该影像总面积为 ${data.rangeArea} 平方千米，其中水域面积 ${data.ndwiArea} 平方千米，禁养区面积 ${data.proArea} 平方千米，限养区面积 ${data.resArea} 平方千米，养殖区面积 ${data.aquArea} 平方千米。该区域养殖总面积 ${data.allArea} 平方千米，养殖数量 ${data.allCount} 个，具体构成如下图所示。`;
        this.text = res.join(" \n ");
        // console.log(this.download.data);
        this.echarts();
      } else if (this.template === "选项2") {
        this.download.data = {};
        this.download.data.longitudeRange = this.allData[0].longitudeRange;
        this.download.data.latitudeRange = this.allData[0].latitudeRange;

        this.tableData = [];
        let len = this.image.length;

        for (let i = 0; i < len; i++) {
          let data = this.allData.find((v) => v.imageTgzName === this.image[i]);
          this.tableData[i] = {};
          this.tableData[i].collectTime = data.collectTime;
          this.tableData[i].rcaArea = data.rcaArea;
          this.tableData[i].ccaArea = data.ccaArea;
          this.tableData[i].allArea =
            this.tableData[i].rcaArea + this.tableData[i].ccaArea;
          this.tableData[i].allArea = this.tableData[i].allArea.toFixed(3);
          if (i) {
            this.tableData[i].rcaCha =
              this.tableData[i].rcaArea - this.tableData[i - 1].rcaArea;
            this.tableData[i].rcaCha = this.tableData[i].rcaCha.toFixed(3);
            this.tableData[i].ccaCha =
              this.tableData[i].ccaArea - this.tableData[i - 1].ccaArea;
            this.tableData[i].ccaCha = this.tableData[i].ccaCha.toFixed(3);
          }
        }
        this.tableData[0].rcaCha =
          this.tableData[0].rcaArea - this.tableData[len - 1].rcaArea;
        this.tableData[0].rcaCha = this.tableData[0].rcaCha.toFixed(3);
        this.tableData[0].ccaCha =
          this.tableData[0].ccaArea - this.tableData[len - 1].ccaArea;
        this.tableData[0].ccaCha = this.tableData[0].ccaCha.toFixed(3);

        this.tableData.sort((item, item2) =>
          item.allArea > item2.allArea ? 1 : -1
        );
        this.download.data.areaMinTime = this.tableData[0].collectTime;
        this.download.data.areaMin = this.tableData[0].allArea;
        this.download.data.areaMaxTime = this.tableData[len - 1].collectTime;
        this.download.data.areaMax = this.tableData[len - 1].allArea;

        this.tableData.sort((item, item2) =>
          Math.abs(item.rcaCha) > Math.abs(item2.rcaCha) ? 1 : -1
        );
        this.download.data.rcaChaMinTime = this.tableData[0].collectTime;
        this.download.data.rcaChaMin = this.tableData[0].rcaCha;
        this.download.data.rcaChaMaxTime = this.tableData[len - 1].collectTime;
        this.download.data.rcaChaMax = this.tableData[len - 1].rcaCha;

        this.tableData.sort((item, item2) =>
          Math.abs(item.ccaCha) > Math.abs(item2.ccaCha) ? 1 : -1
        );
        this.download.data.ccaChaMinTime = this.tableData[0].collectTime;
        this.download.data.ccaChaMin = this.tableData[0].ccaCha;
        this.download.data.ccaChaMaxTime = this.tableData[len - 1].collectTime;
        this.download.data.ccaChaMax = this.tableData[len - 1].ccaCha;

        this.tableData.sort((item, item2) =>
          item.collectTime > item2.collectTime ? 1 : -1
        );
        this.download.data.collectTimeMin = this.tableData[0].collectTime;
        this.download.data.collectTimeMax = this.tableData[len - 1].collectTime;

        // console.log(this.tableData, this.download.data);

        let res = [],
          data = this.download.data;
        data.rcaChaMax =
          (data.rcaChaMax < 0 ? "减少" : "增加") +
          "了" +
          Math.abs(data.rcaChaMax);
        data.rcaChaMin =
          (data.rcaChaMin < 0 ? "减少" : "增加") +
          "了" +
          Math.abs(data.rcaChaMin);
        data.ccaChaMax =
          (data.ccaChaMax < 0 ? "减少" : "增加") +
          "了" +
          Math.abs(data.ccaChaMax);
        data.ccaChaMin =
          (data.ccaChaMin < 0 ? "减少" : "增加") +
          "了" +
          Math.abs(data.ccaChaMin);

        res[0] = `时间范围：${data.collectTimeMin}至${data.collectTimeMax}`;
        res[1] = `经度范围：${data.longitudeRange}`;
        res[2] = `纬度范围：${data.latitudeRange}`;
        res[3] = `养殖变化情况：`;
        res[4] = `该时间范围内养殖面积变化的趋势如图所示，其中养殖面积最高的时间为${data.areaMaxTime}，养殖面积为${data.areaMax}平方千米，养殖面积最低的时间为${data.areaMinTime}，养殖面积为${data.areaMin}平方千米。`;
        res[5] = `将各时间两类养殖区面积与上一时间做差，得到养殖面积波动情况，如图所示。其中RCA面积变化最大的时间为${data.rcaChaMaxTime}，较上一时间${data.rcaChaMax}平方千米，RCA面积变化最小的时间为${data.rcaChaMinTime}，较上一时间${data.rcaChaMin}平方千米；CCA面积变化最大的时间为${data.ccaChaMaxTime}，较上一时间${data.ccaChaMax}平方千米，CCA面积变化最小的时间为${data.ccaChaMinTime}，较上一时间${data.ccaChaMin}平方千米。`;
        this.text = res.join(" \n ");
        // console.log(this.download.data);
        this.echarts2();
      }
    },
    clear() {
      this.text = "";
      this.template = "";
      this.image = [];
      this.options2 = [];
      this.chart.clear();
      this.chart2.clear();
    },
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
                  value: this.download.data.rcaProArea,
                  itemStyle: item4,
                },
                {
                  name: "网箱",
                  value: this.download.data.ccaProArea,
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
                  value: this.download.data.rcaResArea,

                  itemStyle: item4,
                },
                {
                  name: "网箱",
                  value: this.download.data.ccaResArea,

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
                    this.download.data.rcaArea -
                    this.download.data.rcaProArea -
                    this.download.data.rcaResArea,

                  itemStyle: item4,
                },
                {
                  name: "网箱",
                  value:
                    this.download.data.ccaArea -
                    this.download.data.ccaProArea -
                    this.download.data.ccaResArea,

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
                  value: this.download.data.rcaProCount,
                  itemStyle: item4,
                },
                {
                  name: "网箱",
                  value: this.download.data.ccaProCount,
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
                  value: this.download.data.rcaResCount,
                  itemStyle: item4,
                },
                {
                  name: "网箱",
                  value: this.download.data.ccaResCount,
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
                    this.download.data.rcaCount -
                    this.download.data.rcaProCount -
                    this.download.data.rcaResCount,
                  itemStyle: item4,
                },
                {
                  name: "网箱",
                  value:
                    this.download.data.ccaCount -
                    this.download.data.ccaProCount -
                    this.download.data.ccaResCount,
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
    echarts2() {
      //初始化chart
      this.chart = Echarts.init(this.$refs.chart);

      let option = {
        title: {
          text: "养殖面积变化趋势",
          x: "center",
          y: "bottom",
          textStyle: {
            fontSize: 16,
          },
        },
        xAxis: {
          type: "category",
          name: "日期",
          data: this.tableData.map((v) => v.collectTime),
          nameTextStyle: {
            color: "#333333",
          },
          axisLabel: {
            rotate: -20, //此行与上一行作用在于使得X轴坐标倾斜，避免X轴坐标较多无法显示
            textStyle: {
              color: "#333333", //修改坐标轴字体颜色
            },
          },
          axisLine: {
            lineStyle: {
              color: "#333333", //坐标轴的颜色
            },
          },
        },
        yAxis: {
          type: "value",
          name: "面积（km{wsb|2}）",
          nameTextStyle: {
            color: "#333333",
            rich: {
              wsb: {
                verticalAlign: "top",
                fontSize: 7,
              },
            },
          },
          axisLabel: {
            textStyle: {
              color: "#333333",
            },
          },

          axisLine: {
            show: true,
            lineStyle: {
              color: "#333333", //坐标轴的颜色
            },
          },
          axisTick: {
            show: true, //不显示坐标轴刻度线
          },
        },
        series: [
          {
            data: this.tableData.map((v) => v.allArea),
            type: "line",
            color: "rgb(97, 160, 168)",
          },
        ],
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
          text: "养殖面积波动情况",
          x: "center",
          y: "bottom",
          textStyle: {
            fontSize: 16,
          },
        },
        legend: {
          formatter: function (name) {
            const list = {
              rca: "RCA",
              cca: "CCA",
            };
            return list[name];
          },
        },
        xAxis: {
          type: "category",
          name: "日期",
          data: this.tableData.map((v) => v.collectTime),
          nameTextStyle: {
            color: "#333333",
          },
          axisLabel: {
            rotate: -20, //此行与上一行作用在于使得X轴坐标倾斜，避免X轴坐标较多无法显示
            textStyle: {
              color: "#333333", //修改坐标轴字体颜色
            },
          },
          axisLine: {
            lineStyle: {
              color: "#333333", //坐标轴的颜色
            },
          },
        },
        yAxis: {
          type: "value",
          name: "面积差（km{wsb|2}）",
          nameTextStyle: {
            color: "#333333",
            rich: {
              wsb: {
                verticalAlign: "top",
                fontSize: 7,
              },
            },
          },
          axisLabel: {
            textStyle: {
              color: "#333333",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#333333", //坐标轴的颜色
            },
          },
          axisTick: {
            show: true, //不显示坐标轴刻度线
          },
        },
        series: [
          {
            name: "rca",
            type: "bar",
            color: "rgb(115, 178, 255)",
            data: this.tableData.map((v) => v.rcaCha),
          },
          {
            name: "cca",
            type: "bar",
            color: "rgb(255, 127, 127)",
            data: this.tableData.map((v) => v.ccaCha),
          },
        ],
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
      let folder = this.template === "选项1" ? "/temp.docx" : "/temp2.docx";

      JSZipUtils.getBinaryContent(folder, function (error, content) {
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
          return [470, 300]; //这里可更改输出的图片宽和高
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
  watch: {
    template(val, val2) {
      this.image = [];
      for (let i = 0; i < this.allData.length; i++) {
        this.options2[i] = {};
        this.options2[i].value = this.allData[i].imageTgzName;
        this.options2[i].label =
          this.allData[i].collectTime + " " + this.allData[i].imageTgzName;
      }
    },
  },

  mounted() {},
  created() {
    this.getAllImages();
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
        width: 500px;
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
