<template>
    <div>
        <div class="input-group" v-if="type != 'address'">
            <span class="input-group-addon">id</span>
            <input class="form-control" type="text" v-model="options.id" @input="changeOptions('id')"/>
        </div>
        <div class="input-group" v-if="type != 'address'">
            <span class="input-group-addon">name</span>
            <input class="form-control" type="text" v-model="options.name" @input="changeOptions('name')"/>
        </div>
        <div class="input-group" v-if="type != 'address'">
            <span class="input-group-addon">初始值</span>
            <input class="form-control" type="text" v-model="options.value" @input="changeOptions('value')"/>
        </div>
        <div class="input-group" v-if="type != 'address'">
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
                <span class="input-group-addon">url</span>
                <input class="form-control" type="text" v-model="options.url" @input="changeOptions('url')"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">字典值</span>
                <input class="form-control" type="text" v-model="options.dictCode" @input="changeOptions('dictCode')"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">hiddenName</span>
                <input class="form-control" type="text" v-model="options.hiddenName" @input="changeOptions('hiddenName')"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">是否多选</span>
                <div>
                    <label><input type="radio" name="multiple" value="1" v-model="options.multiple" @change="changeOptions('multiple')"/>是</label>
                    <label class="margin-left-15"><input type="radio" checked="checked" name="multiple" value="0" v-model="options.multiple" @change="changeOptions('multiple')"/>否</label>
                </div>
            </div>
            <div class="input-group" v-if="type != 'combotree'">
                <span class="input-group-addon">下拉数据</span>
                <input class="form-control" type="text" v-model="options.data" @input="changeOptions('data')"/>
            </div>
            <div v-else>
                <div class="input-group">
                    <span class="input-group-addon">是否异步</span>
                    <div>
                        <label><input type="radio" name="aysn" value="1" v-model="options.aysn" @change="changeOptions('aysn')"/>是</label>
                        <label class="margin-left-15"><input type="radio" checked="checked" name="aysn" value="0" v-model="options.aysn" @change="changeOptions('aysn')"/>否</label>
                    </div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">是否级联</span>
                    <div>
                        <label><input type="radio" name="cascadeCheck" value="1" v-model="options.cascadeCheck" @change="changeOptions('cascadeCheck')"/>是</label>
                        <label class="margin-left-15"><input type="radio" checked="checked" name="cascadeCheck" value="0" v-model="options.cascadeCheck" @change="changeOptions('cascadeCheck')"/>否</label>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="type == 'numberbox'">
            <div class="input-group">
                <span class="input-group-addon">小数位数</span>
                <input class="form-control" type="number" v-model="options.precision" @input="changeOptions('precision')"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">最小值</span>
                <input class="form-control" type="number" v-model="options.min" @input="changeOptions('min')"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">最大值</span>
                <input class="form-control" type="number" v-model="options.max" @input="changeOptions('max')"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">单位</span>
                <input class="form-control" type="text" v-model="options.suffix" @input="changeOptions('suffix')"/>
            </div>
        </div>
        <div v-else-if="type == 'combotree'">
            <div class="input-group">
                <span class="input-group-addon">是否多选</span>
                <div>
                    <label><input type="radio" name="multiple" value="1" v-model="options.multiple" @change="changeOptions('multiple')"/>是</label>
                    <label class="margin-left-15"><input type="radio" checked="checked" name="multiple" value="0" v-model="options.multiple" @change="changeOptions('multiple')"/>否</label>
                </div>
            </div>
        </div>
        <div v-else-if="type == 'datebox' || type == 'datetimebox'">
            <div class="input-group">
                <span class="input-group-addon">格式化</span>
                <input class="form-control" type="text" v-model="options.format"/>
            </div>
            <div v-if="type == 'datetimebox'" class="input-group">
                <span class="input-group-addon">显示到秒</span>
                <div>
                    <label><input type="radio" name="showSeconds" value="1" v-model="options.showSeconds" @change="changeOptions('showSeconds')"/>是</label>
                    <label class="margin-left-15"><input type="radio" checked="checked" name="showSeconds" value="0" v-model="options.showSeconds" @change="changeOptions('showSeconds')"/>否</label>
                </div>
            </div>
        </div>
        <div v-else-if="type == 'textarea'">
            <div class="input-group">
                <span class="input-group-addon">行数</span>
                <input class="form-control" type="number" v-model="options.rows"/>
            </div>
        </div>
        <div v-else-if="type == 'org'">
            <div class="input-group">
                <span class="input-group-addon">textname</span>
                <input class="form-control" type="text" v-model="options.textname" @input="changeOptions('textname')"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">orgCode</span>
                <input class="form-control" type="text" v-model="options.orgCode" @input="changeOptions('orgCode')"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">是否异步</span>
                <div>
                    <label><input type="radio" name="aysn" value="1" v-model="options.aysn" @change="changeOptions('aysn')"/>是</label>
                    <label class="margin-left-15"><input type="radio" checked="checked" name="aysn" value="0" v-model="options.aysn" @change="changeOptions('aysn')"/>否</label>
                </div>
            </div>
        </div>
        <div v-else-if="type == 'people'">
            <div class="input-group">
                <span class="input-group-addon">displayName</span>
                <input class="form-control" type="text" v-model="options.displayName" @input="changeOptions('displayName')"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">hiddenName</span>
                <input class="form-control" type="text" v-model="options.hiddenName" @input="changeOptions('hiddenName')"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">orgCode</span>
                <input class="form-control" type="text" v-model="options.orgCode" @input="changeOptions('orgCode')"/>
            </div>
            <div class="input-group">
                <span class="input-group-addon">是否多选</span>
                <div>
                    <label><input type="radio" name="multiple" value="1" v-model="options.multiple" @change="changeOptions('multiple')"/>是</label>
                    <label class="margin-left-15"><input type="radio" checked="checked" name="multiple" value="0" v-model="options.multiple" @change="changeOptions('multiple')"/>否</label>
                </div>
            </div>
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
               format: 'yyyy-MM-dd',
               multiple: '0',
               aysn: '0',
               cascadeCheck: '0',
               orgCode: 'rootOrg'
           }
        }
    },
    watch : {
        type (val, oldVal) {
            if (val == 'datebox') {
                this.$set(this.options, 'format', 'yyyy-MM-dd');
            } else if (val == 'datetimebox') {
                this.$set(this.options, 'format', 'yyyy-MM-dd HH:mm:ss');
            }
        }
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

