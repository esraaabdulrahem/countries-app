<template>
  <a
    class="generic-card"
    @click="$router.push({ name: 'GenericDetails', params: { name } })"
  >
    <blured-img-container :image="flag" :alt="alt"></blured-img-container>
    <div class="generic-card__body">
      <p class="generic-card__body__title">{{ name }}</p>
      <div class="generic-card__body__content">
        <p class="generic-card__body__content__text">
          <span>Population:</span> {{ population }}
        </p>
        <p class="generic-card__body__content__text">
          <span>Region:</span> {{ region }}
        </p>
        <p class="generic-card__body__content__text">
          <span>Capital:</span> {{ capital }}
        </p>
      </div>
    </div>
  </a>
</template>

<script>
import BluredImgContainer from "./BluredImgContainer.vue";
export default {
  components: {
    BluredImgContainer,
  },
  props: ["region", "population", "capital", "name", "flag","alt"],
  data() {
    return {
      image: "https://picsum.photos/200/300",
    };
  },
};
</script>
