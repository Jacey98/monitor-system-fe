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
      <div class="pic" ref="chart"></div>
    </div>
    <div id="bottom">
      <el-button type="primary" style="margin-right: 40px">导出</el-button>
      <el-button type="danger">重置</el-button>
    </div>
  </div>
</template>

<script>
let Echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/sunburst"); //按需引入
require("echarts/lib/component/legend");
require("echarts/lib/component/title");
export default {
  name: "ComparisonAnalysis",
  data: function () {
    return {
      chart: null,
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
        color: "#F54F4A",
      };
      const item2 = {
        color: "#FF8C75",
      };
      const item3 = {
        color: "#FFB499",
      };
      //配置数据

      let option = {
        title: {
          text: "aaa",
        },
        series: {
          radius: ["15%", "80%"],
          type: "sunburst",
          sort: undefined,
          emphasis: {
            focus: "ancestor",
          },
          data: [
            {
              value: 5,
              children: [
                {
                  value: 1,
                  itemStyle: item1,
                },
                {
                  value: 2,
                },
              ],
              itemStyle: item1,
            },
            {
              value: 10,
              children: [
                {
                  value: 6,

                  itemStyle: item3,
                },
                {
                  value: 2,

                  itemStyle: item3,
                },
              ],
              itemStyle: item1,
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
    },
  },
  computed: {
    text() {
      let res = [],
        data = this.tableData[0];
      res[0] = `影像名称：${data.imageTgzName}`;
      res[1] = `采集时间：${data.collectTime}`;
      res[2] = `经度范围：${data.longitudeRange}`;
      res[3] = `纬度范围：${data.latitudeRange}`;
      res[4] = `养殖情况：该影像总面积为 ${
        data.rangeArea
      } 平方千米，其中水域面积 ${data.ndwiArea} 平方千米，禁养区面积  ${
        data.proArea
      } 平方千米，限养区面积  ${data.resArea} 平方千米，养殖区面积  ${
        data.aquArea
      } 平方千米。该区域养殖总面积 ${
        data.rcaArea + data.ccaArea
      } 平方千米，养殖数量 ${
        data.rcaCount + data.ccaCount
      }，具体构成如下图所示。`;
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
    display: flex;
    flex-direction: column;

    .pic {
      display: inline-block;
      height: 300px;
      width: 500px;
      margin: 20px auto 0;
      border: 1px solid rgb(219, 219, 219);
    }
  }
  #bottom {
    display: flex;
    justify-content: center;
  }
}
</style>
