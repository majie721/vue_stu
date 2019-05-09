<template>
    <div style="padding-bottom: 160px">
        <van-nav-bar class="mf-nav-bar" title="我的提现"/>
        <div class="account-data account-data-box">
            <ul>
                <li class="left-li">
                    <p><van-icon class="flow-icon" name="gold-coin"/></p>
                    <p><span class="flow-h4">成功额度</span></p>
                    <p><span class="flow-amount">¥0.00</span></p>
                </li>
                <li>
                    <p><van-icon class="flow-icon-primary" name="clock"/></p>
                    <p><span class="flow-h4">提现中</span></p>
                    <p><span class="flow-amount">¥0.00</span></p>
                </li>
                <li class="right-li">
                    <p><van-icon class="flow-icon-info" name="checked"/></p>
                    <p><span class="flow-h4">已到账</span></p>
                    <p class="flow-amount"><span >¥0.00</span></p>
                </li>
            </ul>
        </div>
        <div class="account-data account-data-list">
            <van-cell title="我要提现" class="cell-list-tx" icon="cash-back-record" to="/" >
                <van-tag slot="right-icon" class="tx-amount-icon" round type="primary">¥0.00</van-tag>
            </van-cell>
            <van-cell title="提现记录" class="cell-list-jl" icon="balance-list" is-link />
            <van-cell title="提现问题" class="cell-list-wt" icon="question-o" is-link />
            <van-cell title="联系我们" class="cell-list-lx" icon="chat"  is-link />

        </div>
    </div>
</template>

<script>
    export default {
        name: "Flow"
    }
</script>

<style scoped>
    .account-data{
        background-color: #fff;
        width: 96%;
        padding: 10px 2% 6px;
        border-radius: 8px;
    }

    .account-data-box{
        height: 110px;
    }

    .account-data-list{
       margin-top: 10px;
    }

    .account-data ul{
        width: 100%;
    }

    .account-data li{
        width: 33.33333%;
        height: 96px;
        background-color: rgb(242,242,242);
        list-style: none;
        padding: 10px 0px 0px;
        float: left;
    }

    .left-li{
        border-radius: 8px 0 0 8px;
    }

    .right-li{
        border-radius:  0 8px 8px 0;
    }

    .account-data li p{
        margin: 0px auto 0px;
        text-align: center;
    }

    .flow-h4{
        font-size: 17px;
        color: #797979;
        text-align: center;
    }

    .flow-icon{
        font-size: 28px;
        line-height: 32px;
        color: rgb(255, 177, 18);
    }

    .flow-icon-primary{
        font-size: 28px;
        line-height: 32px;
        color: rgb(100, 158, 226);
    }

    .flow-icon-info{
        font-size: 28px;
        line-height: 32px;
        color: rgb(79,  142,237);
    }

    .flow-amount{
        line-height: 30px;
        font-size: 15px;
        margin-top: 3px;
        text-overflow: ellipsis;
        color: #333;
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

    .tx-amount-icon{
       height: 15px;
        line-height: 15px;
    }
</style>