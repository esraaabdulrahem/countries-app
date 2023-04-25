<template>
  <div class="search-page">
    <div class="container">
      <div class="row">
        <div class="search-page__head">
          <form class="generic-search" @submit.prevent="search(searchWord)">
            <button class="generic-search__btn" tybe="submit">
              <span class="icon-search"></span>
            </button>
            <input
              type="text"
              class="generic-search__input"
              placeholder="Search for a country..."
              v-model="searchWord"
            />
            <button
              type="button"
              class="icon-close generic-search__reset"
              v-if="searchWord != ''"
              @click="getAllCountries()"
              aria-label="Close"
            ></button>
          </form>
          <!-- <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle generic-btn"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter by Region
              <span class="icon-arrow-down"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-for="(country, index) in uniqueFilterList" :key="index">
                <a
                  class="dropdown-item"
                  @click="filterByRegion(country.region)"
                  >{{ country.region }}</a
                >
              </li> 
            </ul>
          </div> -->
          <div class="d-flex">
            <select
              class="generic-btn"
              v-model="key"
              @change="filterByRegion($event)"
            >
              <option value="" selected disabled>Filter by Region</option>
              <option v-for="(country, index) in uniqueFilterList" :key="index">
                {{ country.region }}
              </option>
            </select>
            <button
              class="icon-close reset-btn"
              v-show="key != ''"
              @click="resetFilteration()"
            ></button>
          </div>
        </div>
      </div>

      <div
        class="search-page__results-list"
        v-if="isSearchFound && allCountries.length != 0"
      >
        <div class="row g-lg-5 g-md-3">
          <div
            class="col-lg-3 col-md-4"
            v-for="(country, index) in allCountries"
            :key="index"
          >
            <generic-card
              :name="country.name.official"
              :region="country.region"
              :population="country.population"
              :capital="country.capital?.length ? country.capital[0] : ''"
              :flag="country.flags.png"
              :alt="country.flags.alt"
            ></generic-card>
          </div>
        </div>
      </div>
      <loader v-if="isLoading"></loader>
      <not-found v-if="!isSearchFound"></not-found>
    </div>
  </div>
</template>

<script>
import GenericCard from "@/components/GenericCard.vue";
import axios from "axios";
import NotFound from "@/components/NotFound.vue";
import Loader from "@/components/Loader.vue";

export default {
  components: {
    GenericCard,
    NotFound,
    Loader,
  },
  data() {
    return {
      key: "",
      allCountries: [],
      searchWord: "",
      isSearchFound: true,
      isLoading: false,
      uniqueFilterList: [],
    };
  },
  methods: {
    resetFilteration() {
      this.key = "";
      this.getAllCountries();
    },
    search(searchWord) {
      this.isLoading = true;
      if (searchWord) {
        axios
          .get(`https://restcountries.com/v3.1/name/${searchWord}`)
          .then((Response) => {
            // console.log(Response, "feom search");
            if (Response.status == 200) {
              this.allCountries = Response.data;
              this.isSearchFound = true;
              this.isLoading = false;
            }
          })
          .catch(() => {
            // console.log(error.status, "error");
            this.allCountries = [];
            this.isSearchFound = false;
            this.isLoading = false;
          });
      } else {
        this.isLoading = true;
        this.searchWord = "";
        this.getAllCountries();
      }
    },
    filterByRegion(event) {
      // console.log(event.target.value)

      this.isLoading = true;
      axios
        .get(`https://restcountries.com/v3.1/region/${event.target.value}`)
        .then((res) => {
          console.log(res, "filterByRegion");
          if (res.status == 200) {
            this.allCountries = res.data;
            // console.log(this.allCountries, "allcoun");
            this.isSearchFound = true;
            this.isLoading = false;
          }
        });
    },
    getAllCountries() {
      this.isLoading = true;
      this.searchWord = "";
      axios.get("https://restcountries.com/v3.1/all").then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.allCountries = res.data;
          this.isSearchFound = true;
          this.isLoading = false;

          this.uniqueFilterList = res.data.filter(
            (obj, index) =>
              res.data.findIndex((item) => item.region === obj.region) === index
          );

          console.log(this.uniqueFilterList, "uniqueuniqueunique");
        }
      });
    },
  },
  mounted() {
    this.getAllCountries();
  },
  deactivated() {
    alert("hi");
  },
};
</script>
