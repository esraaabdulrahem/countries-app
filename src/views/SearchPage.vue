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
          <!-- <div class="d-flex">
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
          </div> -->
          <Multiselect
            v-model="countryValue"
            @select="filterByRegion(countryValue)"
            @clear="resetFilteration()"
            placeholder="Filter by Region"
            mode="single"
            :options="options"
          />
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
      <div class="row">
        <not-found v-if="!isSearchFound"></not-found>
      </div>
    </div>
    <loader v-if="isLoading"></loader>
  </div>
</template>

<script>
import GenericCard from "@/components/GenericCard.vue";
import axios from "axios";
import NotFound from "@/components/NotFound.vue";
import Loader from "@/components/Loader.vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

export default {
  components: {
    GenericCard,
    NotFound,
    Loader,
    Multiselect,
  },
  data() {
    return {
      countryValue: "",
      options: ["Americas", "Africa", "Oceania", "Europe", "Asia", "Antarctic"],
      allCountries: [],
      searchWord: "",
      isSearchFound: true,
      isLoading: true,
      uniqueFilterList: [],
    };
  },
  methods: {
    resetFilteration() {
      this.key = "";
      this.getAllCountries();
    },
    stopScrolling() {
      if (this.isLoading) {
        document.body.classList.add("no-scroll");
      }
    },
    search(searchWord) {
      this.isLoading = true;
      this.stopScrolling();
      if (searchWord) {
        axios
          .get(`https://restcountries.com/v3.1/name/${searchWord}`)
          .then((Response) => {
            if (Response.status == 200) {
              this.allCountries = Response.data;
              this.isSearchFound = true;
              this.isLoading = false;
              document.body.classList.remove("no-scroll");
            }
          })
          .catch(() => {
            this.allCountries = [];
            this.isSearchFound = false;
            this.isLoading = false;
          });
      } else {
        this.isLoading = true;
        document.body.classList.add("no-scroll");
        this.searchWord = "";
        this.getAllCountries();
      }
    },
    filterByRegion(valueSelected) {
      this.isLoading = true;
      this.stopScrolling();
      axios
        .get(`https://restcountries.com/v3.1/region/${valueSelected}`)
        .then((res) => {
          if (res.status == 200) {
            this.allCountries = res.data;
            this.isSearchFound = true;
            this.isLoading = false;
            document.body.classList.remove("no-scroll");
          }
        });
    },
    getAllCountries() {
      this.isLoading = true;
      this.stopScrolling();
      this.searchWord = "";
      axios.get("https://restcountries.com/v3.1/all").then((res) => {
        if (res.status == 200) {
          this.allCountries = res.data;
          this.isSearchFound = true;
          this.isLoading = false;
          document.body.classList.remove("no-scroll");

          this.uniqueFilterList = res.data.filter(
            (obj, index) =>
              res.data.findIndex((item) => item.region === obj.region) === index
          );
        }
      });
    },
  },
  mounted() {
    this.getAllCountries();
  },
};
</script>
