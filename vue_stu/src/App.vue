<template>
  <div id="app">

    <router-view />
    <van-tabbar class="mf_tabbar" v-model="active">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/history">交易记录</van-tabbar-item>
      <van-tabbar-item icon="balance-o" to="/flow" dot>提现</van-tabbar-item>
      <van-tabbar-item icon="user-o"  to="/user" >我</van-tabbar-item> <!--info="20"-->
    </van-tabbar>
    </div>
</template>

<script>


export default {
  name: 'App',
    data: function () {
        return {
            active: 0
        }
    },
    created: function () {

    },

    methods: {

    }

}
</script>

<style scoped>
  #app{
    background-color: rgb(239, 239, 244);
    width: 100%;
    height: 100%;
   /* padding-bottom: 200px;*/
  }

  .mf_tabbar{
    background-color: rgb(247, 247, 247);
  }




</style>
