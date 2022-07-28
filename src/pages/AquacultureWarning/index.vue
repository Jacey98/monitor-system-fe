<template>
  <div id="main">
    <p class="title">禁养情况</p>
    <div class="contain">
      <div class="left">
        <p class="innerTitle">近三年禁养面积比例较高的影像</p>
        <p class="item" v-for="(item, index) in value" :key="item.id">
          {{ "* " + item.collectTime + " " + item.imageTgzName }}
        </p>
      </div>
      <div class="right" ref="chart"></div>
    </div>
    <p class="title">限养情况</p>
    <div class="contain">
      <div class="left">
        <p class="innerTitle">近三年限养面积比例较高的影像</p>
        <p class="item" v-for="(item, index) in value" :key="item.id">
          {{ "* " + item.collectTime + " " + item.imageTgzName }}
        </p>
      </div>
      <div class="right" ref="chart2"></div>
    </div>
  </div>
</template>

<script>
let Echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar"); //按需引入 bar柱状图
require("echarts/lib/chart/line"); //按需引入 line折线图
require("echarts/lib/component/legend");
require("echarts/lib/component/title");
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
          collectTime: "2021-10-23",
          rcaArea: 20,
          ccaArea: 20,
          rcaProArea: 10,
          ccaProArea: 10,
          rcaResArea: 5,
          ccaResArea: 5,
        },
        {
          id: 2,
          imageTgzName: "LC81190412013296LGN02",
          collectTime: "2021-10-24",
          rcaArea: 20,
          ccaArea: 20,
          rcaProArea: 10,
          ccaProArea: 10,
          rcaResArea: 5,
          ccaResArea: 5,
        },
        {
          id: 3,
          imageTgzName: "LC81190412013296LGN03",
          collectTime: "2021-10-25",
          rcaArea: 20,
          ccaArea: 20,
          rcaProArea: 10,
          ccaProArea: 10,
          rcaResArea: 5,
          ccaResArea: 5,
        },
        {
          id: 4,
          imageTgzName: "LC81190412013296LGN04",
          collectTime: "2021-10-26",
          rcaArea: 20,
          ccaArea: 20,
          rcaProArea: 10,
          ccaProArea: 10,
          rcaResArea: 5,
          ccaResArea: 5,
        },
        {
          id: 5,
          imageTgzName: "LC81190412013296LGN05",
          collectTime: "2021-10-27",
          rcaArea: 20,
          ccaArea: 20,
          rcaProArea: 10,
          ccaProArea: 10,
          rcaResArea: 5,
          ccaResArea: 5,
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
        title: {
          text: "禁养面积占总养殖面积比例",
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
              total: "Total",
            };
            return list[name];
          },
        },
        xAxis: {
          type: "category",
          name: "日期",
          data: this.value.map((item) => item.collectTime),
        }, // X轴
        yAxis: { type: "value", name: "占比" }, // Y轴
        series: [
          {
            name: "rca",
            type: "bar",
            color: "rgb(115, 178, 255)",
            data: this.value.map(
              (item) => item.rcaProArea / (item.rcaArea + item.ccaArea)
            ),
          },
          {
            name: "cca",
            type: "bar",
            color: "rgb(255, 127, 127)",
            data: this.value.map(
              (item) => item.ccaProArea / (item.rcaArea + item.ccaArea)
            ),
          },
          {
            name: "total",
            type: "line",
            color: "rgb(97, 160, 168)",
            data: this.value.map(
              (item) =>
                (item.rcaProArea + item.ccaProArea) /
                (item.rcaArea + item.ccaArea)
            ),
          },
        ],
      };
      // 传入数据
      this.chart.setOption(option);

      //初始化chart2
      this.chart2 = Echarts.init(this.$refs.chart2);
      //配置数据
      let option2 = {
        title: {
          text: "限养面积占总养殖面积比例",
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
              total: "Total",
            };
            return list[name];
          },
        },
        xAxis: {
          type: "category",
          name: "日期",
          data: this.value.map((item) => item.collectTime),
        }, // X轴
        yAxis: { type: "value", name: "占比" }, // Y轴
        series: [
          {
            name: "rca",
            type: "bar",
            color: "rgb(115, 178, 255)",
            data: this.value.map(
              (item) => item.rcaResArea / (item.rcaArea + item.ccaArea)
            ),
          },
          {
            name: "cca",
            type: "bar",
            color: "rgb(255, 127, 127)",
            data: this.value.map(
              (item) => item.ccaResArea / (item.rcaArea + item.ccaArea)
            ),
          },
          {
            name: "total",
            type: "line",
            color: "rgb(97, 160, 168)",
            data: this.value.map(
              (item) =>
                (item.rcaResArea + item.ccaResArea) /
                (item.rcaArea + item.ccaArea)
            ),
          },
        ],
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
    width: 946px;
    height: 300px;
    padding: 30px 76px;
    box-shadow: 0px 0px 5px rgb(230, 230, 230);
    border: 1px solid rgb(219, 219, 219);
    border-radius: 6px;
    margin: 10px 0 20px;
    display: flex;
    // justify-content: space-between;

    .left {
      display: inline-block;
      height: 100%;
      width: 350px;
      // border: 1px solid rgb(219, 219, 219);

      .innerTitle {
        margin: 10px 0 30px;
        font-size: 18px;
      }
      .item {
        margin-bottom: 28px;
        font-size: 16px;
        color: rgb(122, 122, 122);
      }
    }
    .right {
      display: inline-block;
      height: 100%;
      width: 600px;
      // border: 1px solid rgb(219, 219, 219);
    }
  }
}
</style>
