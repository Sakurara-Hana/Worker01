import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import teaCourse from "./teaCom/teaCourse.vue"
import teaInfo from "./teaCom/teaInfo.vue"
import teaVideo from "./teaCom/teaVideo.vue"
import teacher from "./teaCom/teacher.vue"

import HelloWorld from "./stuCom/HelloWorld.vue";
import studentCourse from "./stuCom/studentCourse.vue";
import studentInfo from "./stuCom/studentInfo.vue";
import student from "./stuCom/student.vue"
import login from "./login.vue"
// 用户
import user from "./User/user.vue"
// 首页--系统管理
import shouYe from "./ShouYe/shouye.vue";
// 用户管理
import userList from "./UserManage/userList.vue"
import adduser from "./UserManage/addUser.vue"
import editUser from "./UserManage/editUser.vue"
//机器管理
import machineList from "./MachineManage/machineList.vue"
import addMachine from "./MachineManage/addMachine.vue"
import editMachine from "./MachineManage/editMachine.vue"

//任务管理
import taskList from "./TaskManage/taskList.vue"
import addTask from "./TaskManage/addTask.vue"
import editTask from "./TaskManage/editTask.vue"
//主号管理
import masterList from "./MasterManage/masterList.vue"
import addMaster from "./MasterManage/addMaster.vue"
import editMaster from "./MasterManage/editMaster.vue"

//好友管理
import friendsList from "./FriendsManage/friendsList.vue"
import addFriends from "./FriendsManage/addFriends.vue"
import editFriends from "./FriendsManage/editFriends.vue"

Vue.config.productionTip = false

var comp=new VueRouter({
    routes:[
        {
          path:'/',
          component:login,
  
        }, 
        {
          path:'/user',
          component:user,
          redirect:"/shouYe",
          children:[
            // 首页
            {
              path:'/shouYe',
              component:shouYe
            },
            // 用户管理
            {
              path:'/userList',
              component:userList
            },
            {
              path:'/adduser',
              component:adduser
            },
            {
              path:'/editUser',
              component:editUser
            },
            //机器管理
            {
              path:'/machineList',
              component:machineList
            },
            {
              path:'/addMachine',
              component:addMachine
            },
            {
              path:'/editMachine',
              component:editMachine
            },
            //任务管理
            {
              path:'/taskList',
              component:taskList
            },
            {
              path:'/addTask',
              component:addTask
            },
            {
              path:'/editTask',
              component:editTask
            },
            //主号管理
            {
              path:'/masterList',
              component:masterList
            },
            {
              path:'/addMaster',
              component:addMaster
            },
            {
              path:'/editMaster',
              component:editMaster
            },
            //好友管理
            {
              path:'/friendsList',
              component:friendsList
            },
            {
              path:'/addFriends',
              component:addFriends
            },
            {
              path:'/editFriends',
              component:editFriends
            },
          ]
        },
        {
          path:'/student',
          component:student,
          redirect:"/course",
          children:[
            {
              path:'/hello',
              component:HelloWorld
            },
            {
              path:'/course',
              component:studentCourse
            },
            {
              path:'/info',
              component:studentInfo
            },
          ]
        },
        {
          path:'/teacher',
          component:teacher,
          redirect:"/teaCourse",
          children:[
            {
              path:'/teaCourse',
              component:teaCourse
            },
            {
              path:'/teaInfo',
              component:teaInfo
            },
            {
              path:'/teaVideo',
              component:teaVideo
            },
          ]
        },
      ]
})

export default comp