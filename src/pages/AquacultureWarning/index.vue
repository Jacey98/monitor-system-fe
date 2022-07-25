<template>
  <div id="main">
    <p class="title">禁养情况</p>
    <div class="contain">
      <div class="inner">
        <p>禁养面积过大预警</p>
        <p v-for="(item, index) in value" :key="item.id">
          {{ item.imageTgzName }}
        </p>
      </div>
      <div class="inner" ref="chart"></div>
    </div>
    <p class="title">限养情况</p>
    <div class="contain">
      <div class="inner" ref="chart2"></div>
    </div>
  </div>
</template>

<script>
let Echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar"); //按需引入 bar柱状图
export default {
  name: "AquacultureWarning",
  data: function () {
    return {
      chart: null,
      chart2: null,
      value: [
        {
          id: 1,
          imageTgzName: "LC81190412013296LGN01",
          collectTime: "2013-10-23",
          ndwiArea: "80",
          proArea: "40",
          resArea: "30",
          rcaArea: "20",
          rcaCount: "100",
          ccaArea: "20",
          ccaCount: "100",
        },
      ],
    };
  },
  methods: {
    echarts() {
      //初始化chart
      this.chart = Echarts.init(this.$refs.chart);
      //配置数据
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        }, // X轴
        yAxis: { type: "value" }, // Y轴
        series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: "bar" }], //配置项
      };
      // 传入数据
      this.chart.setOption(option);

      //初始化chart2
      this.chart2 = Echarts.init(this.$refs.chart2);
      //配置数据
      let option2 = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        }, // X轴
        yAxis: { type: "value" }, // Y轴
        series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: "bar" }], //配置项
      };
      // 传入数据
      this.chart2.setOption(option2);
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

  .title {
    font-size: 20px;
    font-weight: bold;
    color: rgb(122, 122, 122);
  }
  .contain {
    width: 1006px;
    height: 300px;
    padding: 30px 46px;
    box-shadow: 0px 0px 5px rgb(230, 230, 230);
    border: 1px solid rgb(219, 219, 219);
    border-radius: 6px;
    margin: 10px 0 20px;
    display: flex;

    .inner {
      display: inline-block;
      // position: absolute;
      height: 100%;
      width: 400px;
      border: 1px solid rgb(219, 219, 219);
    }
  }
}
</style>
