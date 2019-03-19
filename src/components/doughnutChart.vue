<template>
  <div :data="data" :height="height" ref="doughnutChart" :style="{height:height+'px'}">
  </div>
</template>

<script>
  import ProgressBar from 'progressbar.js'

  export default {
    name: "doughnutChart",
    props: {
      data: {
        type: Object,
        require: true
      },
      height: {
        type: Number,
        require: true
      }
    },
    methods: {
      doughnutChart(id, json) {
        if (json === '') {
          return
        }

        let data = json;
        if (typeof json !== 'object') {
          data = eval('(' + json + ')');
        }
        let min = Math.min(id.clientWidth, id.clientHeight);
        id.style.height = min + 'px';
        id.style.width = min + 'px';
        id.style.margin = min * 0.1 + 4 + 'px';
        let bar = new ProgressBar.Circle(id, {
          // color: '#aaa',
          strokeWidth: 4,
          trailWidth: 1,
          trailColor: '#676a6c',
          easing: 'easeInOut',
          duration: 600,
          text: {
            /* autoStyleContainer: false */
          },
          from: {color: '#aaa', width: 4},
          to: {color: '#333', width: 4},

          step: function (state, circle) {
            circle.path.setAttribute('stroke', data.color);
            circle.path.setAttribute('stroke-width', state.width);
            let value = Math.round(circle.value() * 100);
            if (value === 0) {
              let width = Math.min(circle.svg.getBoundingClientRect().width, circle.svg.getBoundingClientRect().height);
              let size = width * 0.25;
              circle.setText('');
              circle.text.innerHTML = "<span class='span-top'></span><br/><span class='span-line'></span><br/><span class='span-bottom'></span>";
              circle.text.children[0].innerText = data.val.top;
              circle.text.children[0].style.fontSize = size * 0.8 + 'px';
              circle.text.children[2].style.fontSize = size * 0.8 + 'px';
              circle.text.children[2].style.width = min / 2 + 'px';
              circle.text.children[4].style.fontSize = size * 0.6 + 'px';
              circle.text.children[4].innerText = data.val.bottom;
            }
          }
        });
        let label = ['progressbar-label-right', 'progressbar-label-left', 'progressbar-label-top', 'progressbar-label-bottom'];
        for (let i in label) {
          let span = document.createElement('span');
          span.className = label[i];
          switch (label[i]) {
            case 'progressbar-label-right':
              span.innerText = data.label.right;
              break;
            case 'progressbar-label-left':
              span.innerText = data.label.left;
              break;
            case 'progressbar-label-top':
              span.innerText = data.label.top;
              break;
            case 'progressbar-label-bottom':
              span.innerText = data.label.bottom;
              break;
          }
          id.appendChild(span);
        }

        let labelRight = id.getElementsByClassName('progressbar-label-right')[0];
        labelRight.style.fontSize = min * 0.07 + 'px';
        labelRight.style.right = -labelRight.clientWidth / 2 - labelRight.clientHeight + 'px';
        labelRight.style.top = 'calc(50% - ' + labelRight.clientHeight / 2 + 'px)';

        let labelLeft = id.getElementsByClassName('progressbar-label-left')[0];
        labelLeft.style.fontSize = min * 0.07 + 'px';
        labelLeft.style.left = -labelLeft.clientWidth / 2 - labelLeft.clientHeight + 'px';
        labelLeft.style.top = 'calc(50% - ' + labelLeft.clientHeight / 2 + 'px)';

        let labelBottom = id.getElementsByClassName('progressbar-label-bottom')[0];
        labelBottom.style.fontSize = min * 0.07 + 'px';
        labelBottom.style.bottom = -labelBottom.clientHeight - labelBottom.clientHeight / 2 + 'px';
        labelBottom.style.left = 'calc(50% - ' + labelBottom.clientWidth / 2 + 'px)';

        let labelTop = id.getElementsByClassName('progressbar-label-top')[0];
        labelTop.style.fontSize = min * 0.07 + 'px';
        labelTop.style.top = -labelTop.clientHeight - labelTop.clientHeight / 2 + 'px';
        labelTop.style.left = 'calc(50% - ' + labelTop.clientWidth / 2 + 'px)';

        bar.animate(data.scale);

      }
    },
    mounted() {
      this.doughnutChart(this.$refs.doughnutChart, this.data)
    }
  }

</script>

<style scoped>

</style>
