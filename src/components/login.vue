<template>
  <div class="login_wrap">
    <div id="login">
      <p class="top_wrap">欢迎使用望月楼</p>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="user">
          <el-input v-model="ruleForm.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="submitForm(ruleForm)">登录</el-button> -->
          <el-button type="primary" @click="getUserList(ruleForm)">登录</el-button>
          <el-button type="primary" @click="test">测试</el-button>
        </el-form-item>
      </el-form>
      <p class="bottom_wrap">
        <a href>忘记密码了?</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      baseUrl: "http://192.168.50.198/",
      ruleForm: {
        pass: "",
        user: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        user: [{ validator: checkUser, trigger: "blur" }]
      }
    };
  },
  methods: {
    test(){
      var _this=this;
      this.$axios.post(
        this.baseUrl+'index.php/web/menu/editMenu',
        {
        // id: 1,
			  // title: "系统管理",
			  // component: "shouYe",
			  // path: "\/menu",
			  // parent: 0,
			  // grade: null,
        // sort: 1,
        // path:"Task"
			  // permission: 1,
			  // status: 1,
        // child: []
          // id:2,
          // title: "用户管理",
          // sort: 2,
          // component:null,

         id: 17,
        title: "机器列表",
          sort: 1,
        component:'machineList',

        //  id: 4,
        // title: "任务管理",
        //   sort: 4,
        // component: " ",

        //  id: 5,
        // title: "主号管理",
        //   sort: 5,
        // component: " ",

        //  id: 6,
        // title: "好友管理",
        //   sort: 6,
        // component: " ",

        }
      ).then(function(response){
        console.log(response);
      }).catch(function(error){
        console.log(error);
      })
    },
    getUserList(ruleForm) {
      var _this=this;
      this.$axios
        .post(
          this.baseUrl+"index.php/web/login/submit", {
            // username: "00001",
            // password: "123456"
            username: ruleForm.user,
            password: ruleForm.pass
        },                 
          // {'Cookie':'k ='+'919n4thlkdon33ubesk21d6qn0'}    
        ).then(function(response) {
          // console.log('success');
          console.log(response);
          var data = response.data;
          if (data.code == 0) {
            alert(data.msg);
          } else {
            if(data.data.user.grade==1){
              console.log('ff');
               _this.$router.push("user");
            }else{
                 _this.$router.push("teacher");
            }
           
            // alert("登录成功!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitForm(formName) {
      if (formName.user == "学生") {
        this.$router.push("student");
      } else if (formName.user == "教师") {
        this.$router.push("teacher");
      } else {
        alert("用户名或密码错误!");
      }
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
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
.login_wrap {
  height: 100vh;
  background-color: #ccc;
}
#login {
  width: 400px;
  height: 300px;
  /* background-color: blue; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
}
#login .top_wrap {
  margin-bottom: 20px;
  font-size: 20px;
  padding-left: 85px;
  font-weight: 500;
}
#login form {
  width: 100%;
  height: 55%;
}
#login .el-form-item {
  margin-bottom: 15px;
}
#login div.el-form-item__content {
  width: 300px;
  margin-left: 0px !important;
}
#login .el-input {
  width: 100%;
}

#login label.el-form-item__label {
  /* width: 78px !important; */
  color: #fff !important;
}
#login button {
  width: 100%;
  padding: 10px 0;
}
p.bottom_wrap {
  width: 100%;
}
.bottom_wrap a {
  margin-right: -300px;
  color: #337ab7;
  text-align: right;
}
</style>
