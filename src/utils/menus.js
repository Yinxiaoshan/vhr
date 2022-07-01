import {getRequest} from "@/utils/api";

export const initMenu=(router,store,next) => {

    if (store.state.routes() == 0){
        getRequest('/system/config/menu').then( data => {
            if (data){
                let fmtRoutes = formatRoutes(data);
                store.commit('initRoutes',fmtRoutes);
                fmtRoutes.forEach( t => {router.addRoute(t);})
                next({...to,replace:true});
            }
        })
    }else{
        next();
    }

    // if (store.state.routes.length > 0){
    //     return;
    // }
    //
    // getRequest("/system/config/menu").then(data => {
    //     if (data){
    //         let fmtRoutes = formatRoutes(data);
    //         // console.log('======fmtRoutes:'+JSON.stringify(fmtRoutes))
    //         fmtRoutes.forEach( t => {router.addRoute(t);})
    //         // console.log(router)
    //         store.commit('initRoutes',fmtRoutes);
    //     }
    // })
}

export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        if (children && children instanceof Array){
            children = formatRoutes(children);
        }

        let fmRouter = {
            path:path,
            name:name,
            iconCls:iconCls,
            meta:meta,
            children:children,
            component(){
                if (component.startsWith('Home')){
                    return import('../views/'+component)
                }else if (component.startsWith('Emp')){
                    return import('../views/emp/'+component)
                }else if (component.startsWith('Per')){
                    return import('../views/per/'+component)
                }else if (component.startsWith('Sal')){
                    return import('../views/sal/'+component)
                }else if (component.startsWith('Sta')){
                    return import('../views/sta/'+component)
                }else if (component.startsWith('Sys')){
                    return import('../views/sys/'+component)
                }
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}
