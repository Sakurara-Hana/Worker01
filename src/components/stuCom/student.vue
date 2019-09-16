<template>
  <div id="stu">
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
        <el-menu-item index="1" @click="getStudentList">学生</el-menu-item>
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
        <el-menu-item index="3" @click="getTeacherList">教师</el-menu-item>
        <el-menu-item index="4" @click="getAdminList">
          管理员
          <!-- <a href="https://www.ele.me" target="_blank">订单管理</a> -->
        </el-menu-item>
      </el-menu>
    </header>
    <section class="se_wrap">
      <nav>
        <el-menu      
        :default-active="activeIndex"
          :default-openeds="['2']"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
         :router="true"           
        >
         <!-- :router="true"   -->
        <left-menu :leftMenus='userList'></left-menu>
           </el-menu>
      </nav>
      <article>
            <router-view></router-view>
      </article>
    </section>
  </div>
</template>
<script>
import LeftMenu from '../leftComp/leftMenu'
export default {
  created() {
     var _this=this;
    this.$axios.get('http://192.168.50.198//index.php/web/menu/getMenuList').
    then(function (response) {  
    _this.userList=response.data.data;
    console.log(_this.userList);
  })
  .catch(function (error) {
    console.log(error);
  });
  },
  mounted() {
   
  },
  data() {
    return {
      currentSelectBtn:'course',
      course:'课表',
      activeIndex: "1",
      activeIndex2: "1",
      userList:[],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      studentList: [
        {
          id: 1,
          name: "小明"
        },
        {
          id: 2,
          name: "小蓝"
        },
        {
          id: 3,
          name: "小绿"
        }
      ],
      teacherList: [
        {
          id: 1,
          name: "张老师"
        },
        {
          id: 2,
          name: "李老师"
        },
        {
          id: 1,
          name: "王老师"
        }
      ],
      adminList: [
        {
          id: 1,
          name: "管理六"
        },
        {
          id: 1,
          name: "管理五"
        },
        {
          id: 1,
          name: "管理四"
        }
      ]
    };
  },
  name: "app",
  components: {
    LeftMenu
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