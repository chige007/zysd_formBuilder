const path = require('path'); //路劲模块
const webpack = require('webpack'); //webpack模块
const CleanWebpackPlugin = require('clean-webpack-plugin')
const {
	VueLoaderPlugin
} = require('vue-loader'); //渲染vue模板模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html模块
const ExtractTextPlugin = require('extract-text-webpack-plugin');//分离代码插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//压缩代码插件

const isDev = process.env.NODE_ENV === "development"; //判断是否为开发模式

const config = {
	devtool: false,
	entry: { //入口配置
		index: path.join(__dirname, 'src/index.js') //入口js文件
	},
	output: { //输出配置
		path: path.join(__dirname, 'dist'), //输出路径
		publicPath: 'webpage/main/templates/formBuild' //发布路径前缀
	},
	optimization: {//其他配置
		minimize: true,//压缩代码
		minimizer: [//压缩插件
			new UglifyJsPlugin({

			})
		]
	},
	module: {
		rules: [{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
				test: /\.js$/,
				use: ['babel-loader']
			},
			{
				test: /\.jsp$/,
				use: ['raw-loader']
			},
			{
				test: /\.(jpg|png|jpeg|gif|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10240,
						name: 'images/[name].[ext]'
					}
				}]
			}
		]
	},
	plugins: [
		//把模式变量添加到webpack全局变量中
		new webpack.DefinePlugin({
			'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"',
                devPathPrefix: isDev ? '"/UCG_OSS/"' : '""'
			}
		}),
		new HtmlWebpackPlugin({ //生成html插件
			filename: (process.env.NODE_ENV == 'production') ? 'formBuilder.html' : 'formBuilder.html', //html文件名
			template: (process.env.NODE_ENV == 'production') ? 'formBuilder.html' : 'formBuilder_dev.html', //生成html的模板
			//historyFallback : {},//单页面应用记录历史
			chunks: ['index'],
			minify: {
				collapseWhitespace: true, //合并空格
				removeComments: true, //去掉注释
				removeEmptyAttributes: true, //去掉空属性
				collapseInlineTagWhitespace: true, //合并内联空格
				minifyCSS: true, //压缩css
				minifyJS: true //压缩js
			},
			inject: 'body' //script标签插入的位置（head,body,false）
		}),
		new VueLoaderPlugin(), //渲染vue模板插件
		new CleanWebpackPlugin(['dist/js/*.js', 'dist/css/*.css'], {
			root: __dirname,//根目录
			verbose: true,//开启在控制台输出信息
			dry: false//启用删除文件
		})
	]
}

//开发模式
if (isDev) {
	//调试模式
	config.devtool = '#cheap-module-eval-source-map'
	//调试服务器
	config.devServer = {
		port: "8089", //端口号
		host: "0.0.0.0", //可通过localhost或本机ip访问
		overlay: {
			error: true //把错误都显示在网页上
		},
		contentBase: "./dist", //本地服务器所加载的页面所在的目录
		historyApiFallback: true, // 任意的 404 响应都替代为 index.html
        hot: true, // 启用 webpack 的模块热替换特性
        proxy: {
            '/UCG_OSS': {
                target: 'http://localhost:8080',
                pathRewrite: {'^/' : ''}
            }
        }
		//		inline: true// 启用内联模式
	}
	config.output.filename = 'js/index.js';
	config.module.rules.push({
		test: /\.css$/,
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					importLoaders: 1
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					plugins: function () {
						return [
							require('autoprefixer')({
								"browsers": "last 5 version"
							})
						]
					}
				}
			}
		]
	}, {
		test: /\.less$/,
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					importLoaders: 1
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					plugins: function () {
						return [
							require('autoprefixer')({
								"browsers": "last 5 version"
							})
						]
					}
				}
			},
			'less-loader'
		]
	})
	//	添加热加载插件
	config.plugins.push(
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(), //HMR
		new webpack.NoEmitOnErrorsPlugin()
	)
} else { //生产模式
	config.plugins.push(
		new ExtractTextPlugin('css/index_[chunkhash:8].css')
	)
	config.output.filename = 'js/index_[chunkhash:8].js';
	config.module.rules.push({
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: [{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						minimize: true //css压缩
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						plugins: function () {
							return [
								require('autoprefixer')({
									"browsers": "last 5 version"
								})
							]
						}
					}
				}
			]
		})
	}, {
		test: /\.less$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: [{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						minimize: true //css压缩
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						plugins: function () {
							return [
								require('autoprefixer')({
									"browsers": "last 5 version"
								})
							]
						}
					}
				}, 'less-loader'
			]
		})
	});
}

module.exports = config;