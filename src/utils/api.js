import axios from "axios";
import {ElMessage} from "element-plus";

axios.interceptors.response.use(succss => {
    if (succss.status && succss.status == 200 && succss.data.status==500){
        ElMessage.error({message:succss.data.msg})
        return;
    }
    if (succss.data.msg){
        ElMessage.success({message:succss.data.msg})
    }
    return succss.data;
},error => {
    console.log(error.response.status)
    if (error.response.status == 504 || error.response.status == 404){
        ElMessage.error({message:'服务器消失不见了0.0'})
    }else if (error.response.status == 403){
        ElMessage.error({message:'权限不足，请联系管理员'})
    }else if (error.response.status == 401){
        ElMessage.error({message:'没有登录，请登录'})
    }else {
        if (error.response.data.msg){
            ElMessage.error({message:error.response.data.msg})
        }else {
            ElMessage.error({message:'未知错误'})
        }
    }
    return;
})

let base = '';
export  const postKeyValueRequest=(url,params)=>{
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params,
        transformRequest:[function (data){
            let ret = '';
            for (let i in data){
                ret +=encodeURIComponent(i)+'='+encodeURIComponent(data[i])+'&';
            }
            // console.log('>>>>>>>>>>>>>>打印请求地址')
            // console.log(ret)
            // ret = ret.substring(0,ret.length-1)
            return ret;
        }],
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    });
}


export const  postRequest=(url,params) => {
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params
    })
}

export const  putRequest=(url,params) => {
    return axios({
        method:'put',
        url:`${base}${url}`,
        data:params
    })
}

export const  getRequest=(url,params) => {
    return axios({
        method:'get',
        url:`${base}${url}`,
        data:params
    })
}

export const  deleteRequest=(url,params) => {
    return axios({
        method:'delete',
        url:`${base}${url}`,
        data:params
    })
}
