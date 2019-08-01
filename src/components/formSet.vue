<template>
    <div>
        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <div class="panel panel-default" v-for="(c, i_c) in collapseData" :key="c.code" data-option="">
                <div class="panel-heading" role="tab">
                    <div class="panel-title" role="button" data-toggle="collapse" data-parent="#accordion" :href="'#collapseBody_' + i_c" aria-expanded="true" :aria-controls="'#collapseBody_' + i_c">
                        {{c.title}}
                    </div>
                </div>
                <div :id="'collapseBody_' + i_c" class="panel-collapse collapse in" role="tabpanel">
                    <div class="panel-body">
                        <div class="input-group">
                            <span class="input-group-addon">栏目名称</span>
                            <input class="form-control" type="text" v-model="c.title"/>
                        </div>
                        <div class="input-group">
                            <span class="input-group-addon">样式</span>
                            <select class="form-control" v-model="c.tableType">
                                <option value="UCG_formTable_v1">UCG_formTable_v1</option>
                                <option value="UCG_formTable_v2" selected="selected">UCG_formTable_v2</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <span class="input-group-addon">列数</span>
                            <select class="form-control" v-model="c.tableCols" @change="changeTableCols(i_c)">
                                <option value="2">2</option>
                                <option value="4" selected="selected">4</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                        <div class="panel-group" id="subAccordion" role="tablist" aria-multiselectable="true">
                            <div class="panel panel-default" v-for="(f, i_f) in c.formList" :key="f.code">
                                <div class="panel-heading" role="tab">
                                    <div class="panel-title" role="button" data-toggle="collapse" data-parent="#subAccordion" :href="'#subCollapseBody_' + i_c + '_' + i_f" aria-expanded="true" :aria-controls="'#subCollapseBody_' + i_c + '_' + i_f">
                                        {{f.label}}
                                    </div>
                                </div>
                                <div :id="'subCollapseBody_' + i_c + '_' + i_f" class="panel-collapse collapse" role="tabpanel">
                                    <div class="panel-body">
                                        <div class="input-group">
                                            <span class="input-group-addon">类型</span>
                                            <select class="form-control" :name="f.type" v-model="f.type">
                                                <option value="textbox" selected="selected">文本框</option>
                                                <option value="combobox">下拉框</option>
                                                <option value="combotree">下拉树</option>
                                                <option value="numberbox">数字框</option>
                                                <option value="datebox">日期</option>
                                                <option value="datetimebox">日期时间</option>
                                                <option value="textarea">文本域</option>
                                                <option value="org">组织机构</option>
                                                <option value="people">选择人员</option>
                                                <!-- <option value="role">选择角色</option> -->
                                                <option value="address">选择地址</option>
                                            </select>
                                        </div>
                                        <div class="input-group">
                                            <span class="input-group-addon">标题</span>
                                            <input class="form-control" :name="f.label" v-model="f.label"/>
                                        </div>
                                        <form-opt :type="f.type" @changeOptions="changeOptions(i_c, i_f, $event)"></form-opt>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn bg-blue border-0 btn-block margin-bottom-5" @click="addForm(i_c)">添加表单</button>
                    </div>
                </div>
            </div>
            <button class="btn bg-red border-0 btn-block margin-bottom-5" @click="addCollapse">添加栏目</button>
        </div>
    </div>    
</template>
<script>
import formOpt from './formOpt.vue'
export default {
    data () {
        return {
            collapseData: []
        }
    },
    watch: {    
    },
    components: {
        formOpt
    },
    methods: {
        addCollapse () {
            var options = {
                title: '栏目' + (this.collapseData.length + 1),
                code: this.$util.random(),
                tableType: 'UCG_formTable_v2',
                tableCols: '4',
                formList: []
            }
            this.collapseData.push(options);
            this.$emit('addCollapse', options);
        },
        addForm (index) {
            var options = {
                code: this.$util.random(),
                label: '表单' + (this.collapseData[index]['formList'].length + 1),
                type: 'textbox'
            };
            this.collapseData[index]['formList'].push(options);
        },
        changeOptions (i_c, i_f, options) {
            for (var x in options) {
                this.$set(this.collapseData[i_c]['formList'][i_f], x, options[x]);
            }
        }
    },
    mounted () {
        this.addCollapse();
    }
}
</script>

<style lang="less" scoped>
#accordion{
    .panel-title{
        color: #e55!important;
    }
    button{
        &.bg-blue{
            &:hover{
                background-color: #069!important;
            }
        }
        &.bg-red{
            &:hover{
                background-color: #b33!important;
            }
        }
    }
}
#subAccordion{
    .panel-title{
        color: #28b!important;
    }
}
</style>

