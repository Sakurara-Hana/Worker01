<template>
  <div class="hello">
    {{name}}
  </div>
</template>

<script>
export default {
data(){
  return {
    name:'教师课堂视频',
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  background-color: yellow;
  width: 200px;
  height: 100px;
}
</style>