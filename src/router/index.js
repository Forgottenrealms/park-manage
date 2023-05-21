import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addPark = r => require.ensure([], () => r(require('@/page/addPark')), 'addPark');
const addCarOwner = r => require.ensure([], () => r(require('@/page/addCarOwner')), 'addCarOwner');
const carList = r => require.ensure([], () => r(require('@/page/carList')), 'carList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/addPark',
			component: addPark,
			meta: ['添加数据', '添加车位'],
		},{
			path: '/addCarOwner',
			component: addCarOwner,
			meta: ['添加数据', '添加车主'],
		},{
			path: '/carList',
			component: carList,
			meta: ['车位管理', '车位信息'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['车位管理', '车主信息'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
			path: '/adminSet',
			component: adminSet,
			meta: ['设置', '管理员设置'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
