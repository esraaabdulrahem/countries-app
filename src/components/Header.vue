<template>
  <div class="header">
    <div class="container">
      <nav class="navbar navbar-light">
        <a class="navbar-brand header__title" href="/">Where in the world?</a>
        <button
          class="header_theme-switcher"
          id="dark-mode-toggle"
          @click="toggleTheme()"
        >
          <img src="../assets/images/iconMoon.svg" v-if="!isDarkMode" />
          <img src="../assets/images/filledMoon.png" v-else class="header_theme-switcher__icon"/>
          Dark Mode
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    toggleTheme() {
      let theme = localStorage.getItem("theme");
      if (theme === "dark") {
        this.disableDarkMood();
      } else {
        this.enableDarkMood();
      }
    },
    enableDarkMood() {
      localStorage.setItem("theme", "dark");
      this.isDarkMode = true;
      document.body.classList.add("dark-mode");
    },
    disableDarkMood() {
      localStorage.setItem("theme", "light");
      this.isDarkMode = false;
      document.body.classList.remove("dark-mode");
    },
  },
};
</script>

