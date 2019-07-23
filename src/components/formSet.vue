<template>
    <div>
        <div class="input-group">
            <span class="input-group-addon">样式</span>
            <select class="form-control" v-model="tableType">
                <option value="UCG_formTable_v1">UCG_formTable_v1</option>
                <option value="UCG_formTable_v2" selected="selected">UCG_formTable_v2</option>
            </select>
        </div>
        <div class="input-group">
            <span class="input-group-addon">列数</span>
            <select class="form-control" v-model="tableCols">
                <option value="2">2</option>
                <option value="4" selected="selected">4</option>
                <option value="6">6</option>
            </select>
        </div>
        <button class="btn btn-primary btn-block margin-bottom-5" @click="addForm">添加表单</button>
        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <div class="panel panel-default" v-for="(x,index) in collapseData" :key="x.formCode">
                <div class="panel-heading" role="tab">
                    <div class="panel-title" role="button" data-toggle="collapse" data-parent="#accordion" :href="'#collapseBody_' + index" aria-expanded="true" :aria-controls="'#collapseBody_' + index">
                        {{x.label}}
                    </div>
                </div>
                <div :id="'collapseBody_' + index" class="panel-collapse collapse in" role="tabpanel">
                    <div class="panel-body">
                        <div class="input-group">
                            <span class="input-group-addon">类型</span>
                            <select class="form-control" :name="x.type" v-model="x.type">
                                <option value="textbox" selected="selected">文本框</option>
                                <option value="combobox">下拉框</option>
                                <option value="combotree">下拉树</option>
                                <option value="numberbox">数字框</option>
                                <option value="datebox">日期</option>
                                <option value="datetimebox">日期时间</option>
                                <option value="textarea">文本域</option>
                                <option value="org">组织机构</option>
                                <option value="people">选择人员</option>
                                <option value="role">选择角色</option>
                                <option value="address">选择地址</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <span class="input-group-addon">标题</span>
                            <input class="form-control" :name="x.label" v-model="x.label"/>
                        </div>
                        <form-opt :type="x.type" @changeOptions="changeOptions($event, index)"></form-opt>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import formOpt from './formOpt.vue'
export default {
    data () {
        return {
            collapseData: [],
            tableType: 'UCG_formTable_v2',
            tableCols: '4'
        }
    },
    watch: {
        tableType (val, oldVal) {
            this.$emit('changeTableType', val);
        },
        tableCols (val, oldVal) {
            this.$emit('changeTableCols', val);
        }
    },
    components: {
        formOpt
    },
    methods: {
        addForm (e, options) {
            var defaultOpts = {
                formCode: this.$util.random(),
                label: '表单' + (this.collapseData.length + 1),
                type: 'textbox'
            }
            $.extend(true, defaultOpts, options)
            this.collapseData.push(defaultOpts);
            this.$emit('addForm', defaultOpts);
        },
        typeChange (e) {
            console.log(e);
        },
        changeOptions (options, index) {
            for (var x in options) {
                this.$set(this.collapseData[index], x, options[x]);
            }
            // Object.assign(this.collapseData[index], options);
            // this.$emit('changeForm', options, index);
        }
    },
    mounted () {
        this.$emit('changeTableType', this.tableType);
        this.$emit('changeTableCols', this.tableCols);
    }
}
</script>
<style lang="less" scoped>
</style>

