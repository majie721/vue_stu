<template>
   <div style="padding-bottom: 60px">
       <van-nav-bar class="mf-nav-bar" :title="card_info.title+'交易记录'"  />
       <van-tabs @click="onClickBar"  type="card"  v-model="s_active">
           <van-tab title="全部"></van-tab>
           <van-tab title="交易成功"></van-tab>
           <van-tab title="交易失败"></van-tab>
       </van-tabs>

       <van-tabs @click="onClickTime"  v-model="q_active">
           <van-tab title="近五天回收记录"></van-tab>
           <van-tab title="五天前回收记录"></van-tab>
       </van-tabs>


       <van-panel v-for="(item,index) in lists"
                  :key="index" :title="item.title"
                  :desc="item.create_time*1000 |convertTime('YYYY-M-D H:mm')"
                  :status="item.state">
           <div style="padding: 0px 15px">
               <h5 v-if="item.cardno">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号: {{item.cardno}}</h5>
               <p class="card-no-p">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密: {{item.cardpwd}}</p>
               <h5>提交面值: {{item.face_val}}</h5>
               <h5 v-if="item.status == 9 && item.amount > 0 " :class=" item.face_val != item.amount?'line-tips':''">
                   实际面值：&yen;{{item.amount}} 应付金额：&yen;{{item.amount*item.discount/1000}}
               </h5>
           </div>
           <div slot="footer">
               <!--<van-button size="small">按钮</van-button>-->
               <!--<van-button size="small" type="danger">按钮</van-button>-->
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

   // import HistoryActionsheet from "@/components/pages/HistoryActionsheet"
    export default {
        name: "CardHistory",
        data:function(){
            return{
                s_active :0,
                q_active:0,
                card_info:{title:''},
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
            console.log(this.$route.fullPath)
            this.getCardHistory(path)
        },
        beforeRouteUpdate (to, from, next) {
            // react to route changes...
            // don't forget to call next()
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
                            this.card_info = res.data.data.card_info,
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
                let status = 0;
                switch (index) {
                    case 0:
                        status = 0;
                        break;
                    case 1:
                        status = 9;
                        break;
                    case 2:
                        status =8;
                        break;
                    default:
                        status=0;
                        break;
                }
                let query ={
                    id:this.$route.query.id,
                    status:status,
                    recently:this.$route.query.recently?this.$route.query.recently:0,
                }
                this.$router.push({name:'cardHistory',query:query});
            },
            onClickTime:function(index, title){
                let recently = index;
                let query ={
                    id:this.$route.query.id,
                    status:this.$route.query.status?this.$route.query.status:0,
                    recently:recently
                }
                this.$router.push({name:'cardHistory',query:query});
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
                    recently:this.$route.query.recently?this.$route.query.recently:0,
                    page:page
                }
                this.$router.push({name:'cardHistory',query:query});
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
</style>