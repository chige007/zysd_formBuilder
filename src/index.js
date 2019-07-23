import Vue from 'vue'
import app from './app.vue'
import util from './myModules/util'
import './styles/common.less'


if(process.env.NODE_ENV == "development"){
	console.log("当前是开发模式！");
}else if(process.env.NODE_ENV == "production"){
	console.log("当前是生产模式！");
}

Vue.prototype.$util = util
new Vue({
	el : "#APP",
	data : () => {
		return {
		}
	},
	render: (h) => h(app)
});
