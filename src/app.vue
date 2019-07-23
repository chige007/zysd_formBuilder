<template>
<div class="page_formBuilder w-100 h-100 relative">
	<div ref="layout" class="easyui-layout" fit="true">
		<div data-options="region: 'east', title: '设置', split: true, border: false" style="width: 240px; padding: 10px;">
			<form-set @addForm="addForm" @changeTableType="changeTableType" @changeTableCols="changeTableCols"></form-set>
		</div>
		<div data-options="region:'center',title:'预览',border:false" style="">
			<div class="tab_div_body">
                <table :class="[tableType, 'UCG_col-'+tableCols]">
                    <tr v-for="(x, i_x) in trLength" :key="x.code">
                        <template v-for="(y, i_y) in tdLength">
                            <td>
                                <span v-if="getFormDataItem(i_x, i_y, 'datatype') == '*'" class="star">*</span>
                                {{getFormDataItem(i_x, i_y, 'label')}}
                            </td>
                            <td>
                                <input v-if="getFormDataItem(i_x, i_y, 'label')"
                                 type="text" 
                                 :id="getFormDataItem(i_x, i_y, 'id')"
                                 :name="getFormDataItem(i_x, i_y, 'name')"
                                 :value="getFormDataItem(i_x, i_y, 'value')"
                                 :datatype="getFormDataItem(i_x, i_y, 'datatype')"/>
                            </td>
                        </template>
                    </tr>
                </table>
            </div>
		</div>
	</div>
</div>
</template>

<script>
import formSet from './components/formSet.vue'
export default {
	props : {
	},
	computed : {
        trLength () {
            var tableCols = this.tableCols * 1;
            var trLength = [];
            var loop;
            if(tableCols == 4){
                loop = Math.ceil(this.formData.length / 2);
            } else if(tableCols == 2){
                loop = Math.ceil(this.formData.length);
            } else if(tableCols == 6){
                loop = Math.ceil(this.formData.length / 3);
            }
            for(var i = 0 ; i < loop; i++){
                trLength.push({code: i});
            }
            return trLength;
        },
        tdLength () {
            var tableCols = this.tableCols * 1;
            var tdLength = [];
            var loop;
            // if(this.tableType == 'UCG_formTable_v2'){
                if(tableCols == 4){
                    loop = 2;
                } else if(tableCols == 2){
                    loop = 1;
                } else if(tableCols == 6){
                    loop = 3;
                }
            // }
            for(var i = 0 ; i < loop; i++){
                tdLength.push({code: i});
            }
            return tdLength;
        }
	},
	components : {
		formSet
	},
	data : () => {
		return {
            tableType: 'UCG_formTable_v2',
            tableCols: '2',
            formData: []
		};
	},
	methods : {
        addForm (options) {
            this.formData.push(options);
            console.log(this.formData);
        },
        // changeForm (options, index) {
        //     debugger;
        //     Object.assign(this.formData[index], options);
        // },
        changeTableType (type) {
            if(type)
                this.$set(this.$data, 'tableType', type);
        },
        changeTableCols (cols) {
            if(cols)
                this.$set(this.$data, 'tableCols', cols);
        },
        getFormData (index) {
            return this.formData[index] || {};
        },
        getFormDataItem (i_x, i_y, key) {
            var formData = this.formData[i_x * this.tdLength.length + i_y] || {};
            console.log(formData[key])
            return formData[key];
        }
	},
	mounted  () {
        var t_resize = null;
        $(window).on('resize', () => {
            if(t_resize)clearTimeout(t_resize);
            t_resize = setTimeout(() => {
                $(this.$refs.layout).layout('resize');
            }, 300);
        })
	}
} 
</script>

<style lang="less" scoped>

</style>