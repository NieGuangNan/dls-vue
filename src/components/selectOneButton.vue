<template>
  <el-button-group>
    <el-button v-for="(item,index) in data.options" :type="isChoose == item.value ? 'primary' : 'default'"
               @click="onchange(index,item.value)"
               :icon="item.icon">{{item.label}}
    </el-button>
  </el-button-group>
</template>

<script>
  export default {
    name: "selectOneButton",
    data() {
      return {
        isChoose: this.data.value
      }
    },
    props: {
      data: {
        type: Object,
        require: true
      }
    },
    methods: {
      onchange(index, value) {
        this.isChoose = value;
        this.data.value = value;
        this.$emit("change", value)
      }
    }
  }
</script>

<style scoped>

</style>
