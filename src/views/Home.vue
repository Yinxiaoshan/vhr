<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">微人事</div>
        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link" >
            {{user.name}}<i><img :src="user.userface" alt=""></i>
          </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                    <el-dropdown-item command="setting">设置</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu router unique-opened>
            <el-sub-menu :index="index+''" v-for="(item,index) in routes" v-show="!item.hidden" :key="index">
              <template #title>
<!--                <el-icon></el-icon>-->
<!--                <location />-->
                <i style="color: #1a16ff;margin-right: 5px;" :class="item.iconCls"></i>
                <span>{{item.name}}</span>
              </template>
                <el-menu-item :key="indexj" :index="child.path" v-for="(child,indexj) in item.children">{{child.name}}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb :separator-icon="ArrowRight" v-show="this.$router.currentRoute.value.path != '/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.value.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="homeWelcome" v-show="this.$router.currentRoute.value.path == '/home'">
            欢迎来到德莱联盟
          </div>
          <router-view class="homeRouterView"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
import {getRequest} from "@/utils/api";
export default {
  name: "Home",
  data(){
    return{
      user:JSON.parse(window.sessionStorage.getItem("user"))
    }
  },
  computed:{
    routes(){
      return this.$store.state.routes;
    }
  },
  methods:{
    // menuSwitch(index){
    //   this.$router.push(index)
    // },
    commandHandler(cmd){
      if (cmd === 'logout'){
        ElMessageBox.confirm(
            '确定注销登录?',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: '提示',
            }
        )
            .then(() => {
              getRequest("/logout")
              window.sessionStorage.removeItem("user")
              this.$store.commit('initRoutes',[]);
              this.$router.replace("/")
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '已取消',
              })
            })
      }
    }
  }
}
</script>

<style scoped>
.homeRouterView{
  margin-top: 15px;
}
.homeHeader{
  background-color: #9b5c9d;
  display: flex;
  align-items: center;justify-content: space-between;
  padding: 0px 15px;
  box-sizing: border-box;
}
.homeHeader .title{
  font-size: 30px;
  font-family: 华文行楷;
  color: aliceblue;
}
.homeHeader .userInfo{
  cursor: pointer;
}
.el-dropdown-link img{
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 6px;
}
.el-dropdown-link{
  display: flex;
  align-items: center;
}
.homeWelcome{
  text-align: center;
  font-size: 30px;
  font-family: 华文行楷;
  color: #ff2832;
  padding-top: 50px ;
}
</style>
