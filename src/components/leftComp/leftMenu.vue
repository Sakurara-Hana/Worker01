<template>
  <div class="leftMenu">
 
    <label v-for="leftMenu in leftMenus" 
    @click="getRef" 
    >
    	<!--只有一级菜单-->
      <el-menu-item v-if="leftMenu.child.length==0&&leftMenu"
                    :key="leftMenu.id" 
                    :data="leftMenu" 
                    :index="leftMenu.id.toString()" 
                    :route='leftMenu.component'
                 
                    >
          <!--图标-->
       <svg-icon :icon-class="leftMenu.path" />
        <!--标题-->
        <span slot="title">{{leftMenu.title}}</span>
      </el-menu-item>
      <!--有二级菜单-->
      <el-submenu v-if="leftMenu.child.length!=0&&leftMenu.child"
                  :key="leftMenu.id" :data="leftMenu" :index="leftMenu.id.toString()">
                  
        <template  slot="title">
          <!-- <i class="user"></i> -->
          <svg-icon :icon-class="leftMenu.path" />
          {{leftMenu.title}}
        </template>
           <el-menu-item class="cli" v-for="clist in leftMenu.child" :key="clist.id" :index="clist.id.toString()"
           :route='clist.component'
           >{{clist.title}}</el-menu-item>
         
        <!--递归组件，把遍历的值传回子组件，完成递归调用-->
        <!-- <left-menu :leftMenus="leftMenu.child"></left-menu> -->
      </el-submenu>
    </label>
 
  </div>
</template>
 
<script>
  export default {
    name: 'LeftMenu', //使用递归组件必须要有
    props: ['leftMenus'], // 传入子组件的数据
   
    data() {
      return {
       
         
      }
    },
    methods: {
      getRef(index){
        console.log(index);
        var smallTabObj={name:'h',url:'url'};
        // var reg=/(?=\/#\/)[\w]+/g;
        // console.log(index.target.baseURI.match(reg));
        // console.log(index.target.innerText);
        if(index.target.childNodes.length!=3){
        smallTabObj.name=index.target.innerText;
        smallTabObj.url=index.target.baseURI;
        this.$emit("getBarName",smallTabObj);
        } 
        
      }
    }
  }
</script>
 
<style scoped>
 .el-submenu .el-menu-item{
   padding: 0 20px 0 70px;
   background-color: rgb(48, 65, 86) !important;
 }
  .el-submenu .el-menu-item:hover{
    background-color: #1F2D3D !important;
  }
 /* ul.el-menu{ */
   /* background-color: #fff; */
 /* } */
 li svg.svg-icon{
    width: 2em;
 }
 svg use svg.icon{

    margin-right: 2px;
 }
</style>
