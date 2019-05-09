<template>
    <div >
        <van-nav-bar class="mf-nav-bar" title="工单"/>

    </div>
</template>

<script>
    export default {
        name: "Feedback",
        data:function(){
            return{

            }
        },
        created() {
            // let path = this.$route.fullPath
            // this.getCardHistory(path)
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



        }
    }
</script>

<style scoped>

</style>