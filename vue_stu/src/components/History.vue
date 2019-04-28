

<template>
    <div id="mf-history">
        <van-nav-bar class="mf-nav-bar" title="订单记录"/>
        <div >
            <van-tree-select
                    :items="items"
                    :main-active-index="mainActiveIndex"
                    :active-id="activeId"
                    :height = "height"
                    @navclick="onNavClick"
                    @itemclick="onItemClick"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "History",
        data:function () {
            return {
                items:[],
                mainActiveIndex:0,  // 左侧高亮元素的index
                activeId:0,  // 被选中元素的id
                height:document.documentElement.clientHeight-96
            }
        },
        created:function () {
            this.getSelectItems();
        },
        methods: {
            onNavClick(index) {
                this.mainActiveIndex = index;
            },
            onItemClick(data) {
                this.activeId = data.id;
                let type= data.type;
                let routerName = type=='card'?'cardHistory':'pointsHistory';
                this.$router.push({name:routerName,query:{id:data.id}})
            },
            getSelectItems(){
                this.$axios.get('home/getSelectItems')
                    .then((res)=>(console.log(res.data),this.items = res.data.data))
                    .catch(function (error) {
                        console.log(error)
                    })
            }
        },
    }
</script>

<style scoped>

    .van-tree-select__item {
        position: relative;
         font-weight: 500;
        line-height: 44px;
    }
</style>