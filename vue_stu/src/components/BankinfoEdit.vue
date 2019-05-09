<template>
    <div>
        <van-nav-bar class="mf-nav-bar" title="收款账号"/>

        <van-cell-group>
            <van-field
                    name="realname"
                    v-model=user.realname
                    label="银行卡姓名:"
                    required
                    v-validate="'required|max:20'"
                    :error = "errors.has('realname')"
                    :error-message="errors.first('realname')"
            />
            <van-field
                    v-model=user.bank
                    label="开户银行:"
                    @click="onClick"
                    required
                    name ='bank'
                    v-validate="'required|max:20'"
                    :error-message="user.bank?'':errors.first('bank')"

            />
            <van-field
                    v-model=user.bank_num
                    label="银行卡号:"
                    required
                    name ='bank_num'
                    v-validate="'required|max:20'"
                    :error = "errors.has('bank_num')"
                    :error-message="errors.first('bank_num')"
            />
            <van-field
                    v-model=user.moblie
                    label="联系手机:"
                    required
                    name ='moblie'
                    v-validate="'required|mobile'"
                    :error = "errors.has('moblie')"
                    :error-message="errors.first('moblie')"
            />
        </van-cell-group>
        <van-button class="modify-account" type="primary" size="large"  @click="submitForm">保存账号信息</van-button>


        <van-actionsheet
                v-model="show"
        >
            <van-picker
                    show-toolbar
                    title="支持的银行"
                    :columns="bank"
                    @cancel="onCancel"
                    @confirm="onConfirm"
                    @change="onChange"
            />

        </van-actionsheet>
        <p class="waring-text">【特别提醒】姓名错误，卡号错误，将无法收款。请仔细核对3遍。</p>
    </div>
</template>

<script>
    var bank_api = 'user/bankinfo';
    export default {
        name: "BankinfoEdit",
        data:function () {
            return {
                user:{},
                bank:[],
                bank_id:[],
                show:false,
                bank_index:-1
            }
        },
        // props:['userinfo'],
        created(){
            console.log(333)
            this.getUserInfo(bank_api)
        },
        methods:{
            getUserInfo:function(url){
                this.$axios.get(url)
                    .then( (res)=> {
                        this.user = res.data.data.user;
                        var banklists =  res.data.data.bank;
                        for (var i in banklists) {
                            this.bank.push(banklists[i])
                            this.bank_id.push(i)
                        }

                        var bank_id = res.data.data.user.bank_id
                        if(bank_id){
                            this.bank_index = this.bank_id.indexOf(bank_id)
                            console.log(this.bank_index)
                        }
                    })
                    .catch(function(error){
                            console.log(error)
                        }
                    )
            },
            onClick:function () {
                this.show = !this.show
            },
            onConfirm:function(value, index) {
                this.show = false;
                this.user.bank = value;
                this.bank_index = this.bank_id[index]
            },
            onCancel:function() {
                this.show = false
            },
            onChange:function (picker,value, index) {
                console.log(this.bank_id[index])
            },
            submitForm:function () {
                var is_ok = true;
                this.$validator.validate()
                    .then((ok)=>{
                        if(true === ok){
                            this.submitBank()
                        }else{
                            console.log('验证失败');
                            is_ok = false;
                        }
                    })


            },
            submitBank:function () {
                var post_data ={
                    realname:this.user.realname,
                    bank_id :this.bank_index,
                    bank_num:this.user.bank_num,
                    mobile:this.user.moblie,
                };
                this.$axios.post(bank_api,post_data)
                    .then( (res)=> {
                        if(res.data.data.ret ===0){
                            this.$toast.success({message:res.data.data.msg,onClose:()=>{this.$router.push('/user')}})
                            // this.$toast.success(res.data.data.msg)
                            // setTimeout(()=> {
                            //     this.$router.push('/user')
                            // },500)
                        }else{
                            this.$toast.fail(res.data.data.msg)
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

    .modify-account{
        margin-top: 10px;
        /*border-radius: 10px;*/
        /*height: 35px;*/
        /*line-height: 35px;*/
    }

    .waring-text{
        color: red;
        font-size: 12px;
    }
</style>