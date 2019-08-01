<template>
<div class="page_formBuilder w-100 h-100 relative">
	<div ref="layout" class="easyui-layout" fit="true">
		<div data-options="region: 'east', title: '设置', split: true, border: false" style="width: 280px; padding: 10px;">
			<form-set @addCollapse="addCollapse"></form-set>
		</div>
		<div data-options="region:'center',title:'预览',border:false" style="">
			<div class="tab_div_body">
                <collapse v-for="(c, i_c) in collapseData" :key="c.code" :title="c.title">
                    <table :class="[c.tableType, 'UCG_col-' + c.tableCols]">
                        <tr v-for="(tr, i_tr) in getTrLength(i_c)" :key="tr.code">
                            <template v-for="(td, i_td) in getTdLength(i_c)"
                            v-if="getFormDataItem(i_c, i_tr, i_td, 'type') != 'address' && getFormDataItem(i_c, i_tr, i_td, 'type') != 'textarea'">
                                    <td>
                                        <span v-if="getFormDataItem(i_c, i_tr, i_td, 'datatype') == '*'" class="star">*</span>
                                        {{getFormDataItem(i_c, i_tr, i_td, 'label')}}
                                    </td>
                                    <td>
                                        <input                                     type="text" 
                                        :id="getFormDataItem(i_c, i_tr, i_td, 'id')"
                                        :name="getFormDataItem(i_c, i_tr, i_td, 'name')"
                                        :value="getFormDataItem(i_c, i_tr, i_td, 'value')"
                                        :datatype="getFormDataItem(i_c, i_tr, i_td, 'datatype')"/>
                                    </td>
                            </template>
                            <template v-else-if="getFormDataItem(i_c, i_tr, i_td, 'type') == 'textarea'">
                                <td>
                                    <span v-if="getFormDataItem(i_c, i_tr, i_td, 'datatype') == '*'" class="star">*</span>
                                    {{getFormDataItem(i_c, i_tr, i_td, 'label')}}
                                </td>
                                <td colspan="3">
                                    <textarea
                                    :id="getFormDataItem(i_c, i_tr, i_td, 'id')"
                                    :name="getFormDataItem(i_c, i_tr, i_td, 'name')"
                                    :datatype="getFormDataItem(i_c, i_tr, i_td, 'datatype')">
                                    </textarea>
                                </td>
                            </template>
                        </tr>
                    </table>
                </collapse>
            </div>
		</div>
	</div>
</div>
</template>

<script>
import formSet from './components/formSet.vue'
import collapse from './components/collapse.vue'
export default {
	props : {
	},
	computed : {
        
	},
	components : {
        formSet,
        collapse
	},
	data : () => {
		return {
            collapseData: []
		};
    },
	methods : {
        addCollapse (options) {
            this.collapseData.push(options);
            console.log(this.collapseData);
        },
        getFormDataItem (i_c, i_x, i_y, key) {
            var collapseData = this.collapseData[i_c];
            var formData = collapseData['formList'][i_x * this.getTdLength(i_c) + i_y] || {};
            return formData[key];
        },
        getTrLength (i_c) {
            var collapseData = this.collapseData[i_c];
            var tableCols = collapseData.tableCols * 1;
            var formLength = collapseData.formList.length;
            var loopArr = [];
            var loop;
            if(tableCols == 4){
                loop = Math.ceil(formLength / 2);
            } else if(tableCols == 2){
                loop = Math.ceil(formLength);
            } else if(tableCols == 6){
                loop = Math.ceil(formLength / 3);
            }
            for(var i = 0 ; i < loop; i++){
                loopArr.push({code: i});
            }
            return loopArr;
        },
        getTdLength (i_c) {
            var collapseData = this.collapseData[i_c];
            var tableCols = collapseData.tableCols * 1;
            // var loopArr = [];
            // var loop;
            if(tableCols == 4){
                // loop = 2;
                return 2;
            } else if(tableCols == 2){
                // loop = 1;
                return 1;
            } else if(tableCols == 6){
                // loop = 3;
                return 3;
            }
            // for(var i = 0 ; i < loop; i++){
            //     loopArr.push({code: i});
            // }
            // return loopArr;
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