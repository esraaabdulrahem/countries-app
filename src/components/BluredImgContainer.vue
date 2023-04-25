<template>
  <div class="generic-img-wrapper">
    <div
      class="generic-img-wrapper__bluring-bg"
      v-bind:style="{ backgroundImage: 'url(' + image + ')' }"
    ></div>
    <img class="generic-img-wrapper__img" :src="image" v-bind:alt='`${alt}`' />
  </div>
</template>

<script>
export default {
  props: ["image", "alt"],
};
</script>

