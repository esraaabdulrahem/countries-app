<template>
  <div class="details-page">
    <div class="container">
      <button class="generic-btn" @click="$router.push('/')">
        <span class="icon-arrow-prev"></span>
        Back
      </button>
      <div class="details-page__content">
        <div class="row">
          <div class="col-md-5">
            <blured-img-container
              :image="image"
              :alt="countryDetails.flags?.alt"
            ></blured-img-container>
          </div>
          <div class="col-md-7">
            <section class="details-page__content__body">
              <h4
                class="details-page__content__bolded details-page__content__body__title"
              >
                {{ countryDetails.name?.common }}
              </h4>
              <div class="row">
                <div class="col-md-6">
                  <UL class="details-page__content__body__list">
                    <li>
                      <span class="details-page__content__bolded"
                        >Native Name:
                      </span>
                      {{ countryDetails.name?.official }}
                    </li>
                    <li>
                      <span class="details-page__content__bolded"
                        >Population:
                      </span>
                      {{ countryDetails.population }}
                    </li>
                    <li>
                      <span class="details-page__content__bolded"
                        >Region:
                      </span>
                      {{ countryDetails.region }}
                    </li>
                    <li>
                      <span class="details-page__content__bolded"
                        >Sub Region:
                      </span>
                      {{ countryDetails.subregion }}
                    </li>
                    <li>
                      <span class="details-page__content__bolded"
                        >Capital:
                      </span>
                      {{
                        countryDetails.capital?.length
                          ? countryDetails.capital[0]
                          : ""
                      }}
                    </li>
                  </UL>
                </div>
                <div class="col-md-6">
                  <UL class="details-page__content__body__list">
                    <li>
                      <span class="details-page__content__bolded"
                        >Top Level Domain:</span
                      >
                      {{
                        countryDetails.tld?.length ? countryDetails.tld[0] : ""
                      }}
                    </li>
                    <li>
                      <span class="details-page__content__bolded"
                        >Currency:</span
                      >
                      <!-- {{
                        countryDetails.currencies[
                          Object.keys(countryDetails.currencies)[0]
                        ].name
                      }} -->
                      <span
                        class="currency-name"
                        v-for="(currency, index) in countryDetails.currencies"
                        :key="index"
                      >
                        {{ currency.name }}
                         <span class="details-page__content__bolded">/</span>
                      </span>
                    </li>
                    <li>
                      <span class="details-page__content__bolded"
                        >language:</span
                      >
                      {{
                        countryDetails.languages[
                          Object.keys(countryDetails.languages)[0]
                        ]
                      }}
                      <!-- <span
                        v-for="(language, index) in countryDetails.languages"
                        :key="index"
                      >
                        {{ language.name }}
                        <span>/</span> 
                      </span> -->
                    </li>
                  </UL>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="details-page__content__body__border-countries">
                    <span class="details-page__content__bolded"
                      >Border Countries:
                    </span>

                    <section
                      class="d-flex flex-wrap gap-2"
                      v-if="countryDetails.borders"
                    >
                      <button
                        class="generic-btn"
                        v-for="(border, index) in countryDetails.borders"
                        :key="index"
                      >
                        {{ border }}
                      </button>
                    </section>
                    <p v-else>N/A</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BluredImgContainer from "./BluredImgContainer.vue";
import axios from "axios";

export default {
  components: {
    BluredImgContainer,
  },
  data() {
    return {
      image: "",
      countryDetails: {},
      countryName: this.$route.params.name,
    };
  },
  methods: {
    // getByName(countryName) {
    // },
  },
  created() {
    console.log(this.$route.params.name, "name");
    this.countryName = this.$route.params.name;
    // this.getByName(this.$route.params.name);
    axios
      .get(
        `https://restcountries.com/v3.1/name/${this.$route.params.name}?fullText=true`
      )
      .then((res) => {
        console.log(res, "countreee");
        if (res.status == 200) {
          this.countryDetails = res.data[0];
          this.image = this.countryDetails.flags?.png;
          console.log(this.countryDetails, "countries");
        }
      });
  },
};
</script>
