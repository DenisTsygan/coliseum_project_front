import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { 
        path: '/error/:status/:routePath?', 
        component: ()=>import("@/views/ErrorPage.vue"),
        name:"Error",
    },
    { 
        path: '/auth', 
        component: ()=>import("@/views/AuthPage.vue"), 
        name:'Auth',

    },
    { 
        path: '/main', 
        component: ()=>import("@/views/MainPage.vue"), 
        name:'Main',
        meta:{
            isSecured: true
        } 
    }
]//TODO ?add moderator router for adding new user with role

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})
let accessRouteNames = routes.flatMap((el)=>el.name)
const NotAccessRouteNames = ["Error",'Auth'] // TODO  const
accessRouteNames =accessRouteNames.filter((el)=>{
    return !NotAccessRouteNames.includes(el)
})

import { useAuthStore } from '@/stores/auth.store'
import pinia from '@/plugins/pinia'
const authStore = useAuthStore(pinia)
router.beforeEach(async (to, _from, next)=>{
    const routeToName = typeof to.name === "string" ? to.name : ""
    const isAuthUser = await authStore.initIsAuthUser()
    if(!isAuthUser){
        if(routeToName !== 'Auth'){
            next({name:'Auth'})//TODO show if you want use aplication go login
        }else{
            next()
        }
    }else{
        if(!accessRouteNames.includes(routeToName)){
            if(routeToName !== 'Error'){
                next({name:'Error', params:{status:"notProvidedRoute",routePath:to.path.substring(1)}})//TODO show btn back to main page
            }
            else{
                next()
            }
        }else{
            next()
        }
    }
})

export default router