<template>
  <button class="btn btn-primary" @click="event">
    <slot/>
    <i v-show="show" class="fas fa-spinner fa-pulse spinner ml-3" ></i>
  </button>
</template>

<script>
export default {
  props:{
    isLoading:{
      type: Boolean,
      required: true
    }
  },
  computed:{
    show(){
      return this.isLoading;
    }
  },
  methods:{
    event(){
      this.$emit('press-down')
    }
  }
}
</script>

