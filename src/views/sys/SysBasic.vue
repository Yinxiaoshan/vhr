<template>
  <div>
    <el-tabs
        v-model="activeName"
        type="card"
        class="demo-tabs">
      <el-tab-pane label="部门管理" name="first"><DepManage></DepManage></el-tab-pane>
      <el-tab-pane label="职位管理" name="second"><PosManage></PosManage></el-tab-pane>
      <el-tab-pane label="职称管理" name="third"><JobLevelManage></JobLevelManage></el-tab-pane>
      <el-tab-pane label="奖惩规则" name="fourth"><EcManage></EcManage></el-tab-pane>
      <el-tab-pane label="权限组" name="fourth2"><PemissManage></PemissManage></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DepManage from "@/components/sys/basic/DepManage";
import EcManage from "@/components/sys/basic/EcManage";
import JobLevelManage from "@/components/sys/basic/JobLevelManage";
import PemissManage from "@/components/sys/basic/PemissManage";
import PosManage from "@/components/sys/basic/PosManage";

export default {
  name: "SysBasic",
  data(){
    return{
      activeName:'second'
    }
  },
  components:{
    DepManage,EcManage,JobLevelManage,PemissManage,PosManage
  }
}
</script>

<style scoped>

</style>
