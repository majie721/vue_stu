<template>
    <div>
        <van-actionsheet
                v-model="show"
                :actions="actions"
                @select="onSelect"
        >时间</van-actionsheet>
    </div>
</template>

<script>
    export default {
        name: "HistoryActionsheet",
        data() {
            return {
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
            };
        },

        methods: {
            onSelect(item) {
                // 点击选项时默认不会关闭菜单，可以手动关闭
                this.show = false;
                Toast(item.name);
            }
        }
    }
</script>

<style scoped>

</style>