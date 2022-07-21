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

export default new VueRouter({
    routes: [
        {
            path: '/login-page',
            name: 'LoginPage',
            component: LoginPage
        },
        {
            path: '/home-page',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/image-display',
            name: 'ImageDisplay',
            component: ImageDisplay
        },
        {
            path: '/image-management',
            name: 'ImageManagement',
            component: ImageManagement
        },
        {
            path: '/aquaculture-warning',
            name: 'AquacultureWarning',
            component: AquacultureWarning
        },
        {
            path: '/comparison-analysis',
            name: 'ComparisonAnalysis',
            component: ComparisonAnalysis
        },
        {
            path: '/user-management',
            name: 'UserManagement',
            component: UserManagement
        },
        // 重定向
        {
            path: '*',
            redirect: '/image-display'
        },
    ]
})