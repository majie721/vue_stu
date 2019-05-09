<template>
    <div>
        <van-nav-bar class="mf-nav-bar" title="收款账号"/>

        <van-cell-group>
            <van-field
                    :value=user.realname
                    label="银行卡姓名:"
                    disabled
            />
            <van-field
                    :value=user.bank
                    label="开户银行:"
                    disabled
            />
            <van-field
                    :value=user.bank_num
                    label="银行卡号:"
                    disabled
            />
            <van-field
                    v-model=user.moblie
                    label="联系手机:"
                    disabled
            />
        </van-cell-group>
        <van-button class="modify-account" type="info" size="large" to="/bankinfo_edit" >修改收款账号</van-button>
    </div>
</template>

<script>
    export default {
        name: "Bankinfo",
        data:function () {
            return {
                user:{}
            }
        },
        // props:['userinfo'],
        created(){
            this.getUserInfo('user/index')
        },
        methods:{
            getUserInfo:function(url){
                this.$axios.get(url)
                    .then((res)=>(
                        this.user = res.data.data
                    ))
                    .catch(function(error){
                            console.log(error)
                        }
                    )
            }
        }


    }
</script>

<style scoped>

    .modify-account{
        margin-top: 10px;
        /*border-radius: 10px;*/
        /*height: 35px;*/
        /*line-height: 35px;*/
    }
</style>