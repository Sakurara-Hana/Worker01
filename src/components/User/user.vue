<template>
  <div id="stu">
    <header>
      <div class="logo">LOGO</div>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#fff"
        text-color="#000"
        active-text-color="#558FF2"
      >
       <!-- background-color="#545c64" -->
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
        <el-menu-item index="3" disabled>消息中心</el-menu-item> -->
        <el-menu-item index="3" @click="getTeacherList">教师</el-menu-item>
        <el-menu-item index="4" @click="getAdminList">
          管理员
        </el-menu-item>
      </el-menu>
    </header>
    <section class="se_wrap">
      <nav>
          <!-- :default-openeds="['2']" -->
        <el-menu      
        :default-active="activeIndex"         
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
         :router="true"           
        >
         <!-- :router="true"   -->
        <left-menu @getBarName="getBar" :leftMenus='userList'></left-menu>
           </el-menu>
      </nav>
      <article>
        <!-- 小路由button模块 需要左侧导航传来数据-->
          <div class="small_tab">
            <ul class="tab_content" >
              <li>
                <span class="bar_name">系统管理</span>
                
              </li>
              <li v-for="item in small_bar" :key="item.url">
                <span class="bar_name" @click="routerPage(item.url)">{{item.name}}</span>
                <span class="bar_icon" @click="delBar(item.url)">X</span>
                </li>
            </ul>
          </div>
          <!-- 组件，表格部分 -->
            <router-view ></router-view>
      </article>
    </section>
  </div>
</template>
<script>
import LeftMenu from '../leftComp/leftMenu'
export default {
  created() {
     var _this=this;
    this.$axios.get('http://192.168.50.198/index.php/web/menu/getMenuList').
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
      small_bar:[  
        ],
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
  computed:{
     
   
  },
  methods: {
    // 从子组件获得点击的bar的数据，放到数组中
    getBar(barName){
      var flag=false;
      this.small_bar.map(res=>{
        if(res.name==barName.name){
           return  flag=true;
        }
      })
      if(flag==false){
        this.small_bar.push(barName);
      }
    
    //  console.log(this.small_bar);    
    },
    // 删除小导航
    delBar(url){
      this.small_bar.map((item,index)=>{
        if(item.url==url){
          this.small_bar.splice(index,1);
        }
      })
    },
    // 小导航跳转
    routerPage(url){
      console.log(url);
      var reg=/(?=[#][/])[\w]+/g;
      console.log(url.match(reg));
       this.$router.push(url);
    },
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

<style scoped>
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
  
  background-color:#fff;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  color: aliceblue;
  border-bottom: 1px solid #ccc;
  /* position: relative; */
}
div.logo{
  font-size: 40px;
  color: aqua;
}
 header .el-menu-demo li.el-menu-item{
  /* padding: 0 10px; */
  margin: 0 10px;
}
.se_wrap {
  height: calc(100vh - 61px);
  width: 100%;

  display: flex;
  position: relative;
 
}
nav {
  width: 200px;
  height: 100%;
  position: fixed;
  top: 61px;
  bottom: 0;
  left: 0;
  /* background-color: #545c64; */

}
article {
  flex: 1;
  /* background-color:red; */
  padding: 10px;
  position: relative;
  margin-left:210px;
  overflow-x: hidden;
}
/* 头部小导航 */
div.small_tab{
  height: 40px;
  width: 100%;
  background-color: red;
  margin-bottom: 5px;
}
div.small_tab ul {
  height: 100%;
  width: 100%;
  background-color: green;
  display: flex;
  
}
div.small_tab ul li{
  margin: 0 3px;
  height: 70%;
  padding: 0 2px;
  background-color: yellow;
  
}
div.small_tab ul li span.bar_name{
  /* background-color: seagreen; */
  padding: 0 4px;
  cursor: pointer;
}
div.small_tab ul li span.bar_icon{

padding: 0 4px;
border-radius: 10px;
}
div.small_tab ul li span.bar_icon:hover{
background-color: skyblue;
cursor: pointer;
}
a{
  text-decoration: none;
  font-size: 15px;
  color: #fff;
}
</style>