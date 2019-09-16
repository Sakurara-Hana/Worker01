<template>
  <div id="tea">
    <header>
      <div class="logo">LOGO</div>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#558FF2"
      >
        <el-menu-item index="1" @click="getStudentList">教师风采</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <!-- <el-menu-item index="3" disabled>消息中心</el-menu-item> -->
        <el-menu-item index="3" @click="getTeacherList">教师动态</el-menu-item>
        <el-menu-item index="4" @click="getAdminList">
          教师留言
          <!-- <a href="https://www.ele.me" target="_blank">订单管理</a> -->
        </el-menu-item>
      </el-menu>
    </header>
    <section class="se_wrap">
      <nav>
        <el-menu
          :default-active=" activeIndex"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
         :router="true" 
          
        >
         <!-- :router="true"  -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2"  route='teaInfo'>
            <i class="el-icon-menu"></i>
            <!-- <router-link  to="/teaInfo">教师信息</router-link> -->
            <span slot="title" >学生信息</span>
          </el-menu-item>
          <el-menu-item index="3" route='teaCourse'>
            <i class="el-icon-document"></i>
            <!-- <router-link to="/teaCourse">教师课表</router-link> -->
            <span slot="title" >修改密码</span>
          </el-menu-item>
          <el-menu-item index="4" route='teaVideo'>
            <i class="el-icon-setting"></i>
            <!-- <router-link to="/teaVideo">教师视频</router-link> -->
            <span slot="title" >学期课表</span>
          </el-menu-item>
        </el-menu>
      </nav>
      <article>
            <router-view></router-view>
      </article>
    </section>
  </div>
</template>
<script>
 import axios from "axios";
export default {
  created() {
    // this.getStudentList();
  },
  mounted() {

  },
  data() {
    return {
      currentSelectBtn:'course',
      course:'课表',
      activeIndex: "2",
      activeIndex2: "1",
    };
  },
  name: "app",
  components: {
    //  HelloWorld,
    
    //  studentInfo
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getStudentList() {
      this.tableData = this.studentList;
      // axios.get('url').then(res=>{
      //   this.tableData=res.data;
      // })
    },
    getTeacherList() {
      this.tableData = this.teacherList;
    },
    getAdminList() {
      this.tableData = this.adminList;
    }
  }
};
</script>

<style>
@import "//at.alicdn.com/t/font_1274766_o0pvcf7vswh.css";
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 0px; */
}
header {
  display: flex;
  background-color: #545c64;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  color: aliceblue;
}
.se_wrap {
  height: calc(100vh - 61px);

  display: flex;
}
nav {
  width: 200px;
  background-color: #545c64;
}
article {
  flex: 1;
  /* background-color:red; */
  padding: 10px;
}
a{
  text-decoration: none;
  font-size: 15px;
  color: #fff;
}
</style>