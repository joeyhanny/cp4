<template>
  <div class="home">
    <h1>Welcome to Couch and Potato!</h1>
    <div class="link-list">
      <router-link to="/recipes" @click="select('')" class="link">
        <div  @click="select('')">
          <p class="link-title">Recipes</p>
          <img class="link-pic" src="/images/katie-smith-uQs1802D0CQ-unsplash.jpg" alt="">
          <p class="link-description">Here is a list a recipes that we enjoy.</p>
        </div>
      </router-link>
      <router-link to="/recipes" @click="select(randomRecipe._id)" class="link">
        <div @click="select(randomRecipe._id)">
          <p class="link-title">Crowd Favorite</p>
          <img class="link-pic" :src="randomRecipe.path" alt="">
          <p class="link-description">This is our current favorite recipe we use.</p>
        </div>
      </router-link>
      <router-link to="/about" class="link">
        <p class="link-title">About Us</p>
        <img class="link-pic" src="/images/jed-villejo-bEcC0nyIp2g-unsplash.jpg" alt="">
        <p class="link-description">This is a little history of this website.</p>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      recipes: [],
    }
  },
  components: {
  },
  computed: {
    randomRecipe () {return this.getRandom()}
  },
  created() {
    this.getRecipes();
  },
  methods: {
    select(recipeID) {
      this.$root.$data.currentRecipe = recipeID;
    },
    reloadRecipes() {
      this.$root.$data.currentRecipe = '';
    },
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    getRandom() {
      let totalRecipes = this.recipes.length;
      if (totalRecipes == 0) {
        return {_id: 0, path: "none"};
      }

      let randomInt = Math.floor(Math.random() * totalRecipes);

      if (randomInt > totalRecipes) {
        randomInt = randomInt - 1;
      }

      return this.recipes[randomInt];
    }
  }
};
</script>

<style>
  .link-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .link {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 2%;
    margin-bottom: 1%;
    margin-left: 1.5%;
    margin-right: 1.5%;
    width: 100%;
    height: auto;
    text-align: center;
    color: #000000;
    background-color: #E5E5E5;
    border-radius: 10px;
    text-decoration: none;
  }

  .link:active {
    color: #000000;
  }

  .link:hover {
    color: #000000;
  }

  .link-title {
    padding-top: 10px;
    font-size: 40px;
  }


  .link-description {
    padding-top: 20px;
    font-size: 30px;
  }

  .link-title, .link-pic, .link-description {
    width: 100%;
    height: auto;
  }

  /* Tablet Styles */
@media only screen and (min-width: 501px) and (max-width: 960px) {
  .recipe-link {
    width: 40%;
    height: auto;
    font-size: 20px;
  }

  .recipe-img {
    height: 75%;
    width: 100%;
  }

  .long-list-container {
    display: flex;
  }

  .long-list-section {
    padding-right: 20px;
  }

  .link {
    width: 45%;
  }

  .link-title {
    font-size: 150%;
  }

  .link-description {
    font-size: 100%;
  }

  .link-pic {
    height: 40%;
  }

  .about-page-img {
    width: 40%;
  }

  .about-bio {
    font-size: 20px;
  }

}

/* Larger Tablet Styles */
@media only screen and (min-width: 775px) and (max-width: 960px) {
    .link-pic {
      height: 50%;
    }

    .link-description {
      font-size: 150%;
    }
}

/* Small Desktop Styles */
@media only screen and (min-width: 961px) {
  .long-list-container {
    display: flex;
  }

  .long-list-section {
    padding-right: 20px;
  }

  .link {
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 1.5%;
    margin-right: 1.5%;
    width: 30%;
    height: auto;
    text-align: center;
    color: #000000;
    background-color: #E5E5E5;
    border-radius: 10px;
  }

  .link-pic {
    height: 70%;
  }

  .link-title {
    font-size: 210%;
  }

  .link-description {
    font-size: 150%;
  }
}

/* Large Desktop Styles */
@media only screen and (min-width: 1300px) {

}
</style>
