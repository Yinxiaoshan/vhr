<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">微人事</div>
        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link" >
            {{user.name}}<i><img :src="user.userface" alt=""></i>
<!--            <el-icon class="el-icon&#45;&#45;right">-->
<!--              <arrow-down />-->
<!--            </el-icon>-->
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
          <el-menu router>
            <el-sub-menu index="1" v-for="(item,index) in this.$router.options.routes" v-show="!item.hidden" :key="index">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{item.name}}</span>
              </template>
                <el-menu-item :key="indexj" :index="child.path" v-for="(child,indexj) in item.children">{{child.name}}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
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
  methods:{
    // menuSwitch(index){
    //   this.$router.push(index)
    // },
    commandHandler(name){
      if (name === 'logout'){
        ElMessageBox.confirm(
            '确定注销登录?',
            'Warning',
            {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning',
            }
        )
            .then(() => {
              getRequest("/logout")
              window.sessionStorage.removeItem("user")
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
</style>
