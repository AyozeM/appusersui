<template>
  <section>
    <slot/>
    <article class="border p-3 elector">
      <input type="search" class="form-control" v-model="search">
      <p v-for="(resource,i) in localResources" :key="i" v-if="localResources">
        <item :resource="resource" :master="master" @add-resource="addResource" @remove-resource="removeResource" :is-checked="checkIfExists(resource.id)"/>
      </p>
    </article>
  </section>
</template>

<script>
import item from "./resourceElectorItem";
export default {
  components: { item },
  props: {
    resourceList: {
      type: Array,
      required: true
    },
    master: {
      type: Boolean,
      required: true
    },
    assignedResources: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      search: "",
      resources: {}
    };
  },
  computed: {
    localResources() {
      let outputArray;
      if (this.search.length > 0) {
        outputArray = this.resourceList.filter(e =>
          new RegExp(`^${this.search}\w*`).test(e.name)
        );
      } else {
        outputArray = this.resourceList;
      }
      return outputArray;
    }
  },
  watch: {
    assignedResources: {
      handler(updatedResources) {

      },
      deep: true
    }
  },
  methods: {
    addResource(resource){
      this.$emit("add-resource", resource);
    },
    removeResource(resource){
      this.$emit("remove-resource", resource);
    },
    checkIfExists(id){
      let result = false;
      if(this.master){
        result = this.assignedResources.find(e => e.id == id) != undefined ? true: false;
      }
      return result;
    }
  }
};
</script>
