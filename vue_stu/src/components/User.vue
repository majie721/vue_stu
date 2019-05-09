<template>
    <div style="padding-bottom: 160px">
        <van-nav-bar class="mf-nav-bar" title="个人中心"/>
        <div class="account-data account-data-list">
            <van-cell class="user-li">
                <div class="usre-img">
                    <img src="../assets/image/user.png" alt="">
                </div>
                <div class="usre-info">
                    <p class="usre-info-name">{{user.nickname}}</p>
                    <p class="usre-info-vip">黄金会员</p>
                </div>
            </van-cell>
            <van-cell title="手机" class="cell-list-tx" icon="phone-circle-o"  :value="user.moblie?user.moblie:'未绑定手机'" />
            <van-cell title="收款账号" class="cell-list-jl" icon="card" is-link :to="bank_op">
                <div class="bank-i" v-show="bank_dot"></div>
            </van-cell>
            <van-cell title="常见问题" :url="'2019041515095289572'|tipsm" class="cell-list-wt" icon="question-o"  is-link />
            <van-cell title="我的工单" class="cell-list-lx" icon="records" to="/feedbackList" is-link />
            <van-cell title="任何问题可咨询本公众" class="cell-list-zx" icon="chat" />

        </div>
    </div>
</template>

<script>
    export default {
        name: "User",
        data:function(){
          return {
              user:{
              },
              bank_op:'/user/bankinfo',
              bank_dot:false
          }
        },
        created(){
            console.log(22222,this.$route)
            this.getUserInfo('user/index')
        },
        methods:{
            getUserInfo:function(url){
                this.$axios.get(url)
                    .then((res)=>{
                        this.user = res.data.data
                        if(res.data.data.bank_id ==''){
                            this.bank_op = '/bankinfo_edit';
                            this.bank_dot = true;
                        }
                    })
                    .catch(function(error){
                            console.log(error)
                        }
                    )
            }
        }
    }
</script>

<style scoped>
    .account-data{
        background-color: #fff;
        width: 96%;
        padding: 10px 2% 6px;
        border-radius: 8px;
    }

    /*.account-data-list{*/
        /*margin-top: 10px;*/
    /*}*/

    .user-li{
        width: 100%;
        height: 80px;
    }

    .usre-img{
        width: 60px;
        height: 60px;
        float: left;
    }

    .usre-info{
        width: 50%;
        height: 60px;
        float: left;
    }

    .usre-info p{
        padding-left: 5px;
        margin: 0px;
    }

    .usre-info-name{
        line-height: 35px;
    }

    .usre-info-vip{
        line-height: 15px;
        font-size: 12px;
        color: #8f8f94;
    }

    .user-li img{
      width: 40px;
      height: 40px;
      margin: 10px 10px;
    }

    .account-data li{
        width: 33.33333%;
        height: 96px;
        background-color: rgb(242,242,242);
        list-style: none;
        padding: 10px 0px 0px;
        float: left;
    }


    .van-cell__left-icon {
        min-width: 1em;
        height: 24px;
        font-size: 24px;
        line-height: 24px;
    }

    .cell-list-tx .van-cell__left-icon{
        color: gold;
    }

    .cell-list-jl .van-cell__left-icon{
        color: rgb(8,186,12);
    }

    .cell-list-wt .van-cell__left-icon{
        color: rgb(8,186,12);
    }

    .cell-list-lx .van-cell__left-icon{
        color: rgb(28,175,239);
    }

    .cell-list-zx{
        color: red;
    }
    .cell-list-zx .van-cell__left-icon{
        color: rgb(37, 182, 72);
    }

    .tx-amount-icon{
        height: 15px;
        line-height: 15px;
    }

    .bank-i{
        position: absolute;
        top: 8px;
        right: 0px;
        width: 8px;
        height: 8px;
        border-radius: 100%;
        background-color: #f44;
    }

</style>