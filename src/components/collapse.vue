<template>
    <div>
        <div class="blockHeader open mini" :id="id">
            <div class="title">{{title}}</div>
            <i class="collapseBtn ucgi ucgi-less"></i>
        </div>
        <div class="contentContainer" :id="bodyId">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            id: 'collapse_' + this.$util.random(),
            bodyId: 'collapseBody_' + this.$util.random()
        }
    },
    methods: {
        
    },
    mounted () {
        this.$nextTick(() => {
            ucgImprove.initReport();
        })
    }
}
</script>
<style lang="less" scoped>
</style>

