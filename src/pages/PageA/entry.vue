<template>
  <div>pageA------{{ name }}</div>
</template>

<script>
export default {
  name: "PageA",
  data() {
    return {
      name: "lejie"
    };
  },
  mounted() {
    setTimeout(() => {
      this.name = "lee";
    }, 3000);
  },
  watch: {
    name: function(newVal) {
      console.log(newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>