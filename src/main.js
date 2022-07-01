import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import store from "@/store";
import {formatRoutes, initMenu} from "@/utils/menus";
import 'font-awesome/css/font-awesome.min.css'
import {getRequest} from "@/utils/api";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


// import {postRequest,postKeyValueRequest,getRequest,putRequest,deleteRequest} from "@/utils/api";
// import {postKeyValueRequest} from "@/utils/api";
// import {getRequest} from "@/utils/api";
// import {putRequest} from "@/utils/api";
// import {deleteRequest} from "@/utils/api";

const app = createApp(App);

// app.config.globalProperties.$postRequest=postRequest
// app.config.globalProperties.$postKeyValueRequest=postKeyValueRequest
// app.config.globalProperties.$getRequest=getRequest
// app.config.globalProperties.$putRequest=putRequest
// app.config.globalProperties.$deleteRequest=deleteRequest

// app.use(postRequest)
// app.use(getRequest)
// app.use(putRequest)
// app.use(deleteRequest)
// app.use(postKeyValueRequest)
app.use(router)
app.use(ElementPlus)
app.use(store )

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

router.beforeEach((to,from,next) => {
    if (to.path == '/'){
        next();
    }else {
        if(window.sessionStorage.getItem("user")) {
            if(store.state.routes == 0) {
                getRequest("/system/config/menu").then(data=>{
                    if(data) {
                        let fmtRoutes = formatRoutes(data);
                        store.commit('initRoutes',fmtRoutes);
                        fmtRoutes.forEach(t => {
                            router.addRoute(t)
                        })
                        next({...to, replace: true})
                    }
                })
            } else {
                next();
            }
        } else {
            next('/?redirect='+to.path)
        }
        // initMenu(router,store);
        // next();
    }
})

app.mount('#app')
