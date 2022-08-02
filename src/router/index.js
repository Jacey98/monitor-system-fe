import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '@/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import ImageDisplay from '@/pages/ImageDisplay'
import ImageManagement from '@/pages/ImageManagement'
import AquacultureWarning from '@/pages/AquacultureWarning'
import ComparisonAnalysis from '@/pages/ComparisonAnalysis'
import UserManagement from '@/pages/UserManagement'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const includPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return includPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

let router = new VueRouter({
    routes: [
        {
            path: '/login-page',
            name: 'LoginPage',
            component: LoginPage,
            meta: {
                isAuth: false
            }
        },
        {
            path: '/home-page',
            name: 'HomePage',
            component: HomePage,
            meta: {
                isAuth: true
            },
        },
        {
            path: '/image-display',
            name: 'ImageDisplay',
            component: ImageDisplay,
            meta: {
                isAuth: true
            }
        },
        {
            path: '/image-management',
            name: 'ImageManagement',
            component: ImageManagement,
            meta: {
                isAuth: true
            }
        },
        {
            path: '/aquaculture-warning',
            name: 'AquacultureWarning',
            component: AquacultureWarning,
            meta: {
                isAuth: true
            }
        },
        {
            path: '/comparison-analysis',
            name: 'ComparisonAnalysis',
            component: ComparisonAnalysis,
            meta: {
                isAuth: true
            }
        },
        {
            path: '/user-management',
            name: 'UserManagement',
            component: UserManagement,
            meta: {
                isAuth: true
            }
        },
        // 重定向
        {
            path: '*',
            redirect: '/login-page'
        },
    ]
})

// 路由前置守卫
router.beforeEach((to,from,next)=>{
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('token')){ //权限控制的具体规则
			next() //放行
		}else{
			alert('登录已过期，请重新登录')
			next('/login-page')
		}
	}else{
		if(localStorage.getItem('token')){ //权限控制的具体规则
			next('/home-page') //放行
		}else{
			next()
		}
	}
})

export default router