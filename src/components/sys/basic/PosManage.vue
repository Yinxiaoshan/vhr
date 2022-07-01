<template>
  <div>
    <div style="display: flex">
      <el-input
          class="addPosInput"
          v-model="pos.name"
          placeholder="添加职位..."
          prefix-icon="Plus"
          @keydown.enter.native="addPosition"
      />
      <el-button icon="Plus" @click="addPosition">添加</el-button>
    </div>
    <div class="posTable">
      <el-table :data="positions" stripe border @selection-change="handleSelectionChange" style="width: 70%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号" width="100" />
        <el-table-column prop="name" label="职位名称" width="280" />
        <el-table-column prop="createDate" label="创建时间" />

        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="showEditView(scope.$index, scope.row)"
            >编辑</el-button
            >
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-button type="danger" @click="deleteMany" :disabled="multipleSelection.length == 0" style="margin-top: 8px;">批量删除</el-button>

      <el-dialog
          v-model="dialogVisible"
          title="修改职位"
          width="30%"
      >
        <div style="display: flex">
          <div style="margin: auto 3px auto 0;font-size: 15px;">职位名称</div>
          <el-input class="updatePosInput" v-model="updatePos.name"></el-input>
        </div>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="doUpdate">确定</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {deleteRequest, getRequest, postRequest, putRequest} from "@/utils/api";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "PosManage",
  data(){
    return {
      pos:{
          name:''
      },
      positions:[],
      dialogVisible:false,
      updatePos:{
        name:''
      },
      multipleSelection:[]
    }
  },
  methods:{
    deleteMany(){
      ElMessageBox.confirm(
          '此操作将删除'+this.multipleSelection.length+'条记录,是否继续？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            let ids = '?';
            this.multipleSelection.forEach(item => {
              ids += 'ids=' + item.id + '&';
            })
            deleteRequest('/system/basic/pos/'+ids).then(resp => {
              if (resp){
                this.initPositions();
              }
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Delete canceled',
            })
          })
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      console.log(val)
    },
    doUpdate(){
      putRequest('/system/basic/pos/',this.updatePos).then(resp => {
        if (resp){
          this.initPositions();
          this.updatePos.name = '';
          this.dialogVisible = false;

        }
      })
    },
    addPosition(){
      if (this.pos.name){
        postRequest('/system/basic/pos/',this.pos).then(resp =>{
          if (resp){
            this.initPositions();
            this.pos.name = ''
          }
        })
      }else {
        ElMessage.error('职位名称不能为空!!!')
      }
    },
    showEditView(index,data){
      // this.updatePos = data
      Object.assign(this.updatePos,data)
      this.dialogVisible = true;
    },
    handleDelete(index,data){
      ElMessageBox.confirm(
          '确定删除['+data.name+']职位？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            deleteRequest('/system/basic/pos/'+data.id).then(resp => {
              if (resp){
                this.initPositions();
              }
            })
            // ElMessage({
            //   type: 'success',
            //   message: 'Delete completed',
            // })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Delete canceled',
            })
          })
    },
    initPositions(){
      getRequest('/system/basic/pos/').then(resp => {
        if (resp){
          this.positions = resp;
        }
      })
    }
  },
  mounted() {
    this.initPositions();
  }
}
</script>

<style scoped>
.updatePosInput{
  width: 200px;
  margin-left: 8px;
}
.addPosInput{
  width: 300px;
  margin-right: 10px;
}
.posTable{
  margin-top: 10px;
}
</style>
