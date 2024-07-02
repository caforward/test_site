<template>
    <div id="slider-round" class="slider-styled" ref="slider"></div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref, watch, PropType, inject } from 'vue';
  
  declare global {
  interface HTMLElement {
    noUiSlider?: any;  
  }
}

  export default defineComponent({
    props: {
      start: {
        type: Array as PropType<number[]>,
        required: true
      },
      step: {
        type: Number,
        default: 100
      },
      range: {
        type: Object as PropType<{ min: number; max: number }>,
        required: true
      }
    },
    setup(props, { emit }) {
      const slider = ref<HTMLElement | null>(null);
      const noUiSlider = inject('noUiSlider') as any;
  
      const getCurrentValue = () => {
        return slider.value?.noUiSlider.get(true); 
      };
  
      onMounted(() => {
        if (slider.value) {
          noUiSlider.create(slider.value, {
            start: props.start,
            step: props.step,
            range: props.range,
            connect: [true, false],
          });
  
          slider.value.noUiSlider.on('update', () => {
            emit('value-changed', getCurrentValue().toFixed());
          });
        }
      });
  
      watch(() => [props.start, props.range, props.step], () => {
        if (slider.value && noUiSlider) {
          noUiSlider.destroy();
          noUiSlider.create(slider.value, {
            start: props.start,
            step: props.step,
            range: props.range,
            connect: [true, false],
          });
        }
      }, { deep: true });
  
      return {
        slider
      };
    }
  });
  </script>
  
  <style scoped lang="scss">

.slider-styled {
    border-radius: 5px;
    max-width: 654px;
    height: 6px;
    :deep(.noUi-handle) {
        border-radius: 100%;
        width: 26px;
        height: 26px;
        top:-11px;
        border: 4px solid #0096D8;
        box-shadow: inset 0 0 1px #FFF, inset 0 1px 7px #EBEBEB, 0 3px 6px -3px #BBB;
        &::after {
            display: none;
        }
        &::before {
            display: none;
        };
    }
    :deep(.noUi-connect){
        background-color: #0096D8;
    };

}


  </style>