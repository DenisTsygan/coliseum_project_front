import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { 
        path: '/error/:status', 
        component: ()=>import("@/views/ErrorPage.vue"),
        name:"Error"
    },
    { 
        path: '/main', 
        component: ()=>import("@/views/MainPage.vue"), 
        name:'AdminConsole',
        meta:{
        isSecured: true
        } 
    }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
let accessRouteNames = routes.flatMap((el)=>el.name)
accessRouteNames =accessRouteNames.filter((el)=>{
  return el !== 'Error'
})


router.beforeEach(async (to, _from, next)=>{
    if(accessRouteNames.includes(to.name)){
        const isAuthUser = true
        if(to.meta.isSecured && !isAuthUser){
            next({name:'Error', params: {status:"forbidden"}})
        }
        next()
    }else{
        if(to.name === "Error"){
            next()
        }else{
            next({name:'Error', params: {status:"notProvidedRoute",path:to.path}})
        }
    }
})

export default router