<template>
  <el-button-group>
    <el-button v-for="item in data.options" :type="data.value === item.value ? 'primary' : 'default'"
               @click="onchange(item.value)"
               :icon="item.icon">{{item.label}}
    </el-button>
  </el-button-group>
</template>

<script>
  export default {
    name: "selectOneButton",
    props: {
      data: {
        type: Object,
        require: true
      }
    },
    methods: {
      onchange(value) {
        this.data.value = value;
        this.$emit("change", value)
      }
    }
  }
</script>

<style scoped>

</style>
