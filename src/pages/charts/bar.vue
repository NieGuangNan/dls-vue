<template>
  <div id="barWrap">

    <div id="test"
         option="option"></div>
  </div>
</template>

<script>
    import HighCharts from 'highcharts';
    import options from '@/services/options'

export default {
      name: "bar",
      data () {
        let option = options.bar;
        return {
          id: 'test',
          option: option
        }
      },
      mounted() {
        HighCharts.chart(this.id,this.option);
      }
    }
</script>

<style scoped>
  #barWrap{
    padding: 0 1rem 1rem;
  }

</style>
