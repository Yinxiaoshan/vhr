<template>
  <div>
    <el-form :rules="rules" :model="loginForm" class="loginContainer" ref="loginForm1">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="text" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRem">记住密码</el-checkbox>
      <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import {postKeyValueRequest} from "@/utils/api";

export default {
  name: "Login",
  data(){
    return {
      rules:{
        username:[{required:true,message:'请输入用户名',trigger:'blur'}],
        password:[{required:true,message:'请输入密码',trigger:'blur'}]
      },
      loginForm:{
        username:'admin',
        password: '123'
      },
      checked:true
    }
  },
  methods:{
    submitLogin(){
      this.$refs.loginForm1.validate((validate) => {
        if (validate){
          postKeyValueRequest("/doLogin",this.loginForm).then(resp=>{
            if (resp){
              // alert(JSON.stringify(resp));
              window.sessionStorage.setItem("user",JSON.stringify(resp.obj));
              this.$router.replace('/home');
            }
          });
        }else {
          this.$message.error('请输入所有字段>>>')
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
 .loginContainer{
   border-radius: 15px;
   background-clip: padding-box;
   margin-text-outline: 180px auto;
   width: 350px;
   padding: 35px 35px 15px 35px;
   background: aliceblue;
   border: 1px solid #1a16ff;
   box-shadow: 0 0 25px #cac6c6;
   margin: auto auto;
 }
 .loginTitle{
   margin: 20px auto 20px auto;
   text-align: center;
   color: #9d9d55;
 }
 .loginRem{
   text-align: left;
   margin: 0px 0px 15px 0px;
 }
</style>
