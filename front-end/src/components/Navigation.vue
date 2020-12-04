<template>
  <div id="menu">
    <div id="brand">
      <router-link to="/">
          <img src="/images/logo.png">
      </router-link>
    </div>
    <div id="tabs">
      <router-link to="/">
        <p class="menu-item">Home</p>
      </router-link>
      <router-link to="/recipes">
        <p class="menu-item" @click="reloadRecipes()" >Recipes</p>
      </router-link>
      <router-link to="/about">
        <p class="menu-item">About</p>
      </router-link>
    </div>
  </div>
</template>

<script scoped>
  export default {
    name: 'Navigation',
    methods: {
      reloadRecipes() {
        this.$root.$data.currentRecipe = '';
        if (location.pathname.includes("recipes")) {
          //location.reload();
        }
      },
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #menu {
    display: flex;
    flex-wrap: wrap;
    background-color: #041E42;
    padding: 10px;
    align-items: center;
  }

  img {
    width: 100px;
    height: auto;
  }

  #tabs {
    display: flex;
    flex-wrap: wrap;
    height: inherit;
  }

  #tabs a {
    font-weight: bold;
    color: #808d9f;
    text-decoration: none;
  }

  #tabs a.router-link-exact-active {
    color: #fefefb;
  }

  .menu-item {
    font-size: 20px;
    margin: 10px;
  }
</style>
