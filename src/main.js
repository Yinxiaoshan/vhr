import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';


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

app.mount('#app')
