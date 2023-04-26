<template>
  <div class="generic-loader">
    <img src="../assets/images/loader.gif" />
  </div>
</template>

<script>
export default {
  props: ["isLoading"],
  //   methods: {
  //     stopScrolling() {
  //       if (this.isLoading) {
  //         document.body.classList.add("no-scroll");
  //       } else {
  //         document.body.classList.remove("no-scroll");
  //       }
  //     },
  //   },
  //   mounted() {
  //     this.stopScrolling();
  //   },
};
</script>
