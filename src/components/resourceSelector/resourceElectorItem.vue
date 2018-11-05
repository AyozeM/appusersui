<template>
  <label :for="resource.id">
    <input v-if="master" type="checkbox" :id="resource.id" v-model="checked" @change="toggleCheck">
    <span v-if="checked"><del>{{resource.name}}</del></span>
    <span v-else>{{resource.name}}</span>
    <span class="close" v-if="!master" @click="removeResource">x</span>
  </label>
</template>

<script>
export default {
  props: {
    resource: {
      type: Object,
      required: true
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    master: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      checked: this.isChecked
    };
  },
  methods: {
    toggleCheck() {
      let event = this.checked ? "add-resource" : "remove-resource";
      this.$emit(event, this.resource);
    },
    removeResource() {
      this.$emit("removeResource", this.resource);
    }
  }
};
</script>

