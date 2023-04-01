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
          imageTgzName: "LC81180422015135LGN00",
          collectTime: "2015-05-15",
          rcaArea: 11.26,
          ccaArea: 0.12,
          rcaProArea: 4.43,
          ccaProArea: 0.0,
          rcaResArea: 5.19,
          ccaResArea: 0.11,
        },
        {
          id: 2,
          imageTgzName: "LC81180422017220LGN00",
          collectTime: "2017-08-08",
          rcaArea: 9.99,
          ccaArea: 6.92,
          rcaProArea: 5.12,
          ccaProArea: 2.11,
          rcaResArea: 3.9,
          ccaResArea: 4.43,
        },
        {
          id: 3,
          imageTgzName: "LC81180422017268LGN00",
          collectTime: "2017-09-25",
          rcaArea: 24.5,
          ccaArea: 4.25,
          rcaProArea: 10.76,
          ccaProArea: 1.15,
          rcaResArea: 11.71,
          ccaResArea: 913.0,
        },
        {
          id: 4,
          imageTgzName: "LC81180422017300LGN00",
          collectTime: "2017-10-27",
          rcaArea: 24.34,
          ccaArea: 6.02,
          rcaProArea: 10.69,
          ccaProArea: 1.84,
          rcaResArea: 11.45,
          ccaResArea: 865.0,
        },
        {
          id: 5,
          imageTgzName: "LC81190412017307LGN00",
          collectTime: "2017-11-03",
          rcaArea: 27.84,
          ccaArea: 3.0,
          rcaProArea: 11.61,
          ccaProArea: 0.98,
          rcaResArea: 13.38,
          ccaResArea: 1.7,
        },
      ],
      value2: [
        {
          id: 1,
          imageTgzName: "LC81180422015103LGN01",
          collectTime: "2015-04-13",
          rcaArea: 8.05,
          ccaArea: 2.3,
          rcaProArea: 3.74,
          ccaProArea: 0.15,
          rcaResArea: 3.61,
          ccaResArea: 2.09,
        },
        {
          id: 2,
          imageTgzName: "LC81180422015327LGN01",
          collectTime: "2015-11-23",
          rcaArea: 18.48,
          ccaArea: 3.82,
          rcaProArea: 7.5,
          ccaProArea: 0.61,
          rcaResArea: 8.88,
          ccaResArea: 3.09,
        },
        {
          id: 3,
          imageTgzName: "LC81190412016065LGN00",
          collectTime: "2016-03-05",
          rcaArea: 27.89,
          ccaArea: 5.3,
          rcaProArea: 12.12,
          ccaProArea: 0.8,
          rcaResArea: 13.04,
          ccaResArea: 4.32,
        },
        {
          id: 4,
          imageTgzName: "LC81180422017092LGN01",
          collectTime: "2017-04-02",
          rcaArea: 28.96,
          ccaArea: 5.18,
          rcaProArea: 11.74,
          ccaProArea: 1.2,
          rcaResArea: 14.42,
          ccaResArea: 3.72,
        },
        {
          id: 5,
          imageTgzName: "LC81190412017355LGN00",
          collectTime: "2017-12-21",
          rcaArea: 17.61,
          ccaArea: 3.38,
          rcaProArea: 6.55,
          ccaProArea: 1.02,
          rcaResArea: 8.92,
          ccaResArea: 2.09,
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
          data: this.value2.map((item) => item.collectTime),
        }, // X轴
        yAxis: { type: "value", name: "占比" }, // Y轴
        series: [
          {
            name: "rca",
            type: "bar",
            color: "rgb(115, 178, 255)",
            data: this.value2.map(
              (item) => item.rcaResArea / (item.rcaArea + item.ccaArea)
            ),
          },
          {
            name: "cca",
            type: "bar",
            color: "rgb(255, 127, 127)",
            data: this.value2.map(
              (item) => item.ccaResArea / (item.rcaArea + item.ccaArea)
            ),
          },
          {
            name: "total",
            type: "line",
            color: "rgb(97, 160, 168)",
            data: this.value2.map(
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
