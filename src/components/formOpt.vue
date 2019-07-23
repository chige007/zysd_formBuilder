<template>
    <div>
        <div class="input-group">
            <span class="input-group-addon">id</span>
            <input class="form-control" type="text" v-model="options.id" @input="changeOptions('id')"/>
        </div>
        <div class="input-group">
            <span class="input-group-addon">name</span>
            <input class="form-control" type="text" v-model="options.name" @input="changeOptions('name')"/>
        </div>
        <div class="input-group">
            <span class="input-group-addon">初始值</span>
            <input class="form-control" type="text" v-model="options.value" @input="changeOptions('value')"/>
        </div>
        <div class="input-group">
            <span class="input-group-addon">验证</span>
            <select class="form-control" v-model="options.datatype" @change="changeOptions('datatype')">
                <option value="" selected="selected">无</option>
                <option value="*">必填</option>
                <option value="n">数字</option>
                <option value="p">邮政编码</option>
                <option value="m">手机号码</option>
                <option value="e">邮箱地址</option>
                <option value="url">网址</option>
                <option value="zh">中文字符</option>
                <option value="qq">qq号码</option>
                <option value="tel">固定电话</option>
                <option value="idcard">身份证</option>
            </select>
        </div>
        <div v-if="type == 'textbox'">

        </div>
        <div v-else-if="type == 'combobox' || type == 'combotree'">
            <div class="input-group">
                <span class="input-group-addon">下拉数据</span>
                <input class="form-control" type="text" v-model="options.format"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">url</span>
                <input class="form-control" type="text"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">字典值</span>
                <input class="form-control" type="text"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">是否多选</span>
                <div>
                    <label><input type="radio" name="multiple" value="1"/>是</label>
                    <label class="margin-left-15"><input type="radio" checked="checked" name="multiple" value="0"/>否</label>
                </div>
            </div>
            <div class="input-group">
                <span class="input-group-addon">hiddenName</span>
                <input class="form-control" type="text"/>
            </div>
        </div>
        <div v-else-if="type == 'numberbox'">
            <div class="input-group">
                <span class="input-group-addon">小数位数</span>
                <input class="form-control" type="number"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">最小值</span>
                <input class="form-control" type="number"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">最大值</span>
                <input class="form-control" type="number"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">单位</span>
                <input class="form-control" type="text"/>
            </div>
        </div>
        <!-- <div v-else-if="type == 'combotree'">
            combotree
        </div> -->
        <div v-else-if="type == 'datebox' || type == 'datetimebox'">
            <div class="input-group">
                <span class="input-group-addon">格式化</span>
                <input class="form-control" type="number" v-model="options.format"/>
            </div>
        </div>
        <!-- <div v-else-if="type == 'datetimebox'">
            datetimebox
        </div> -->
        <div v-else-if="type == 'textarea'">
            <div class="input-group">
                <span class="input-group-addon">行数</span>
                <input class="form-control" type="number" v-model="options.rows"/>
            </div>
        </div>
        <div v-else-if="type == 'org'">
            org
        </div>
        <div v-else-if="type == 'people'">
            people
        </div>
        <div v-else-if="type == 'role'">
            role
        </div>
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'textbox'
        }
    },
    data () {
        return {
           options: {
               format: 'yyyy-MM-dd'
           }
        }
    },
    watch : {
        // options (val, oldVal) {
        //     this.;
        // }
    },
    methods: {
        changeOptions (key) {
            var obj = {};
            obj[key] = this.options[key];
            this.$emit('changeOptions', obj);
        }
    },
    mounted () {
        
    }
}
</script>
<style lang="less" scoped>
</style>

