<template>
    <div >
        <van-nav-bar class="mf-nav-bar" title="我的工单"/>
        <van-tabs @click="onClickBar"  type="card"  v-model="s_active">
            <van-tab title="卡密工单"></van-tab>
            <van-tab title="积分工单"></van-tab>
        </van-tabs>
        <van-tabs @click="onClickTime"  v-model="q_active">
            <van-tab title="全部"></van-tab>
            <van-tab title="处理中"></van-tab>
            <van-tab title="处理完成"></van-tab>
            <van-tab title="已关闭"></van-tab>
        </van-tabs>

        <van-panel v-for="(item,index) in lists"
                   :key="index" :title="'订单ID:'+item.id"
                   :desc="item.create_time*1000 |convertTime('YYYY-M-D H:mm')"
                   :status="item.status">
            <div style="padding: 0px 15px">
                <!--<div v-if="item.order_type == 1">-->
                <!--<h5 >转让积分：{{item.point}}</h5>-->
                <!--</div>-->

                <!--<div v-else-if="item.order_type == 2">-->
                <!--<h5>充值金额：{{item.amount}}</h5>-->
                <!--<h5>充值号码：{{item.target}}</h5>-->
                <!--</div>-->

                <!--<div v-else-if="item.order_type == 3">-->
                <!--<h5>转让号码：{{item.phone}}</h5>-->
                <!--<h5>总 面 值：{{item.coupon_datas}}</h5>-->
                <!--</div>-->

                <!--<h5>-->
                <!--结算价格：-->
                <!--{{item.amount}}-->
                <!--</h5>-->
                <!--<h5>-->
                <!--处&nbsp;理&nbsp;提&nbsp;示：{{item.remark}}-->
                <!--</h5>-->

            </div>
            <div slot="footer">

                <van-button v-if="(item.state == 9 && item.order_type == 3)"  size="small"  type="info">券码明细</van-button>

                <van-button size="small" v-if="item.state == 8 && item.feedback_id>0" type="info">查看工单</van-button>
                <van-button size="small" v-if="item.state == 8 && item.feedback_id ==='0'" type="warning">申请工单</van-button>
                <!--<span v-if="item.status==8">-->

                <!--</span>-->




            </div>
        </van-panel>


        <van-pagination
                v-model="currentPage"
                :total-items="rowCount"
                :show-page-size="3"
                :items-per-page =5
                force-ellipses
                v-if ="pageCount>1"
                @change="paginationChange()"
        />

    </div>
</template>

<script>
    export default {
        name: "FeedbackList",
        data:function(){
            return{
                s_active :0,
                q_active:0,
                bank_info:{type:''},
                lists:[],
                currentPage:0,
                rowCount:0,
                pageCount:1,
                pageSize:5,
                show: false,
                actions: [
                    {
                        name: '选项'
                    },
                    {
                        name: '选项',
                        subname: '描述信息'
                    },
                    {
                        loading: true
                    },
                    {
                        name: '禁用选项',
                        disabled: true
                    }
                ]
            }
        },
        created() {
            let path = this.$route.fullPath
            this.getCardHistory(path)
        },
        beforeRouteUpdate (to, from, next) {
            let path = to.fullPath
            this.getCardHistory(path);
            next();
        },


        methods:{
            getCardHistory:function(path){
                this.$axios.get(path)
                    .then((res)=>(
                        console.log(res),
                            this.lists = res.data.data.lists.data,
                            this.bank_info = res.data.data.bank_info,
                            this.currentPage = res.data.data.lists.pageIndex,
                            this.rowCount = res.data.data.lists.rowCount,
                            this.pageCount = res.data.data.lists.pageCount,
                            this.pageSize = res.data.data.lists.pageSize,
                            this.initNavBarActive()
                    ))
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            onClickBar:function (index, title) {
                // let status = 0;
                // switch (index) {
                //     case 0:
                //         status = 0;
                //         break;
                //     case 1:
                //         status = 9;
                //         break;
                //     case 2:
                //         status =8;
                //         break;
                //     default:
                //         status=0;
                //         break;
                // }
                // let query ={
                //     id:this.$route.query.id,
                //     status:status,
                //     // recently:this.$route.query.recently?this.$route.query.recently:0,
                // }
                // this.$router.push({name:'pointsHistory',query:query});
            },
            onClickTime:function(index, title){
                // let recently = index;
                // let query ={
                //     id:this.$route.query.id,
                //     status:this.$route.query.status?this.$route.query.status:0,
                //     // recently:recently
                // }
                // this.$router.push({name:'pointsHistory',query:query});
            },
            onSelect(item) {
                // 点击选项时默认不会关闭菜单，可以手动关闭
                this.show = false;
                Toast(item.name);
            },
            initNavBarActive(){
                let status = this.$route.query.status?this.$route.query.status:0;
                if(status ==8){
                    this.s_active =2;
                }else if(status ==9){
                    this.s_active = 1;
                }else{
                    this.s_active = 0;
                }

                this.q_active = this.$route.query.recently?this.$route.query.recently:0;

                this.currentPage = this.$route.query.page? parseInt(this.$route.query.page):1;
            },
            paginationChange(){
                let page =this.currentPage;
                let query ={
                    id:this.$route.query.id,
                    status:this.$route.query.status?this.$route.query.status:0,
                    // recently:this.$route.query.recently?this.$route.query.recently:0,
                    page:page
                }
                this.$router.push({name:'pointsHistory',query:query});
            }


        }
    }
</script>

<style scoped>
    h5{
        margin:  3px 0px;
        color: #969799;
        font-size: 12px;
        line-height: 18px;
    }

    .card-no-p{
        margin:  3px 0px;
        color: #969799;
        font-size: 12px;
        line-height: 18px;
        width: 100%;
        word-wrap:break-word;
        font-weight: bold;
    }


    .line-tips{
        color: red;
    }

    .van-panel{
        box-shadow: -3px 2px 9px 1px #eee
    }

    .van-button--small {
        padding: 0 2px;
        height: 25px;
        min-width: 60px;
        font-size: 12px;
        line-height: 25px;
    }
</style>