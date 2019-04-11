<template>
  <div id="buttonGroup">
    <el-button-group>
      <el-button v-for="item in data.options" :key="item.value" :type="data.value === item.value ? 'primary' : 'default'"
                 @click="onchange(item.value)"
                 :icon="item.icon">{{item.label}}
      </el-button>
    </el-button-group>
  </div>

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
  #buttonGroup{
    display: inline-block;
    vertical-align:4%;
  }



</style>
