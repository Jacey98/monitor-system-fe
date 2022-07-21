import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import LoginPage from '@/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import ImageDisplay from '@/pages/ImageDisplay'
import ImageManagement from '@/pages/ImageManagement'
import AquacultureWarning from '@/pages/AquacultureWarning'
import ComparisonAnalysis from '@/pages/ComparisonAnalysis'

export default new VueRouter({
    routes:[
        {
            path:'/login-page',
            component:LoginPage
        },
        {
            path:'/home-page',
            component:HomePage
        },
        {
            path:'/image-display',
            component:ImageDisplay
        },
        {
            path:'/image-management',
            component:ImageManagement
        },
        {
            path:'/aquaculture-warning',
            component:AquacultureWarning
        },
        {
            path:'/comparison-analysis',
            component:ComparisonAnalysis
        },
        // 重定向
        {
            path:'*',
            redirect:'/home-page'
        },
    ]
})