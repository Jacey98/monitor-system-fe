<template>
  <div id="app" class="clearfix">
    <PageHeader v-show='this.$route.path !== "/login-page"'></PageHeader>
    <router-view style='padding-top: 80px; box-sizing: border-box;' class="clearfix"></router-view>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader'
export default {
  name: "App",
  components:{
    PageHeader
  },
  data: function () {
    return {
      
    };
  },
  methods: {
    
  },
};
</script>

<style lang='less'>
html,body {
  height: 100%;
  background: rgb(240, 242, 245);  
  overflow-x: hidden;
  overflow-y: auto;
}
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
}

</style>
