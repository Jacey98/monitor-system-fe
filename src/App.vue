<template>
  <div id="app">
    <PageHeader v-show='1'></PageHeader>
    <router-view></router-view>
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
  // height: 100%;
  background: rgb(240, 242, 245);  
  overflow-y: hidden; 
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
