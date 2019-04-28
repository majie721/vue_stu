<template>
    <div id="home">
        <div style="background-color: #fff">
            <img class="home-header-img" src="http://mfsk.com/themes/mui/img/index_header.png">
        </div>
        <div style="margin-top: 0px">
            <li>
                <span>热门业务</span>
            </li>
            <div class="grid">
                <a href="" v-for="(item,index) in hotBusinessData" class="grid-a" :key="index">
                    <div class="grid-a-middle">
                        <img class="grid-a-middle-img" :src="item.src">
                        <div>
                            <span>{{item.title}}</span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div style="clear: both"></div>
        <div style="margin-top: 20px">
            <li>
                <span>话费/石化/商超/代金券/游戏</span>
            </li>
            <div class="grid">
                <a v-for="(item,index) in tab2Data" :key="index" href="" class="grid-a">
                    <div class="grid-a-middle">
                        <img class="tab-img" :src="item.img">
                        <div>
                            <span>{{item.title}}</span>
                            <p v-if="item.status==1">(开发中)</p>
                        </div>
                    </div>
                </a>

            </div>
        </div>
        <div style="clear: both"></div>
        <div style="margin-top: 20px;">
            <li>
                <span>积分来换钱</span>
            </li>
            <div class="grid">
                <a v-for="(item,index) in points" :key="index" href="" class="grid-a">
                    <div class="grid-a-middle">
                        <img class="tab-img" :src="item.img">
                        <div>
                            <span>{{item.title}}</span>
                            <p v-if="item.status==1">(开发中)</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div style="clear: both"></div>
    </div>
</template>
<script>
    export default {
        name: "Home",
        data: function () {
            return {
                active: 0,
                hotBusinessData: '',
                tab2Data: '',
                points: ''
            }
        },
        created: function () {
            this.hotBusiness();
        },

        methods: {
            hotBusiness: function () {
                this.$axios.get('home/index')
                    .then(
                        (res) => (this.hotBusinessData = res.data.data.hot,
                                this.tab2Data = res.data.data.tab,
                                this.points = res.data.data.points
                        )
                    )
                    .catch(function (error) {
                        console.log(error)
                    })

            }
        }
    }


</script>

<style scoped>
    #home {
        margin-bottom: 60px;
    }
    #home li {
        list-style: none;
        height: 30px;
        border-bottom: 1px solid #F6F6F6;
        padding-left: 20px;
        background-color: #fff
    }

    #home li span {
        line-height: 30px;
        font-size: 14px;
    }

    .home-header-img {
        width: 100%;
    }

    .grid {
        width: 100%;
    }

    .grid-a {
        width: 33.3%;
        float: left;
    }

    .grid-a-middle {
        padding: 15px 0;
        text-align: center;
        font-size: 12px;
        border-right: 1px solid #F6F6F6;
        border-bottom: 1px solid #F6F6F6;
        color: black;
        background-color: #fff
    }

    .grid-a-middle p {
        margin: 0px;
    }

    .grid-a-middle-img {
        height: 50px;
        line-height: 20px;
        border: 0;
    }

    .tab-img {
        height: 50px;
        line-height: 20px
    }

</style>