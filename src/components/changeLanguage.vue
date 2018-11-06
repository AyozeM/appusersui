<template>
  <section class="row justify-content-end">
    <div v-for="(language,i) in languages" :key="i" @click="change(language.lang)" class="m-2">
      <label :for="language.iso">
        <input type="radio" :id="language.iso" v-model="selected" :value="language.lang" class="d-none">
        <flag :iso="language.iso" :squared="false" class="flag" :class="{actualFlag:selected == language.lang}"/>
      </label>
    </div>
  </section>
</template>

<script>
export default {
  props:{
    languages:{
      type: Array,
      required: true
    }
  },
  data(){
    return{
      selected: ''
    }
  },
  methods:{
    change(lang){
      this.$i18n.locale = lang;
    }
  },
  mounted(){
    this.selected = this.languages[0].lang;
  }
}
</script>

<style scoped>
  div{
    font-size: 3em;
  }
  .flag{
    cursor: pointer;
    filter: grayscale(100%);
    transition:.5s;
  }
  .actualFlag{
    filter:grayscale(0%)
  }
</style>
