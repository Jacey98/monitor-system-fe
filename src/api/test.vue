<template>
  <div id="app">
    <span>{{ serverResponse }} </span>
    <button @click="getData">GET DATA</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data: function () {
    return {
      serverResponse: "resp",
    };
  },
  methods: {
    getData() {
      var that = this;
      // 对应 Python 提供的接口，这里的地址填写下面服务器运行的地址，本地则为127.0.0.1，外网则为 your_ip_address
      const path = "http://127.0.0.1:5000/getMsg";
      axios
        .get(path)
        .then(function (response) {
          var msg = response.data.msg;
          that.serverResponse = msg;
          // alert(
          //   "Success " + response.status + ", " + response.data + ", " + msg
          // );
        })
        .catch(function (error) {
          alert("Error " + error);
        });
    },
  },
};
</script>

<style lang='less'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
