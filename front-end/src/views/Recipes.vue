<template>
  <div class="recipes" :key="componentKey">
    <div v-if="this.$root.$data.currentRecipe == ''">
      <h1>Recipes</h1>

      <div class="wrapper">
        <span class="fieldText">Search by name:</span>
        <div class="search">
          <form class="pure-form">
            <input v-model="searchText" />
          </form>
        </div>
      </div>

      <div class="recipe-list">
        <div class="recipe-link recipe" @click="select(recipe._id)" v-for="recipe in searchedRecipes" :key="recipe._id">
          <img class="recipe-img" :src="recipe.path">
          <span class="recipe-name">{{recipe.title}}</span>
        </div>
      </div>

    </div>
    <div v-else>
      <h1>{{currentRecipe.title}}</h1>
      <img class="recipe-page-img" :src="currentRecipe.path">
      <div class="content-right">
        <div class="ingredient-section">
          <h2>Ingredients</h2>
          <div class="ingrediant-subsections">
            <div class="ingrediant-subsection" v-for="ingrediantSubsection in currentRecipe.ingrediantsArray" :key="ingrediantSubsection[0][0]">
              <h3>{{ingrediantSubsection[0][0]}}</h3>
              <ul class="ingredients"> <!-- ingredient-item -->
                <li class="ingredient-item" v-for="ingrediant in ingrediantSubsection[1]" :key="ingrediant">{{ingrediant}}</li>
              </ul>
            </div>
          </div>
        </div>

        <hr>

        <div class="instruction-section">
          <h2>Instructions</h2>
          <ol class="instructions"> <!-- instruction-point -->
            <li class="ingredient-item" v-for="instruction in currentRecipe.instructionsArray" :key="instruction">{{instruction}}</li>
          </ol>
        </div>

        <div v-if="currentRecipe.citationURL != ''">
          <div class="citation"> <!-- Put Original Recipe URL Here -->
            <p>From <a target="_blank" :href="''+currentRecipe.citationURL+''">
            {{currentRecipe.citationName}}</a> </p>
          </div>
        </div>
        <div v-else>
          <div class="citation"> <!-- Put Original Recipe URL Here -->
            <p>From {{currentRecipe.citationName}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "Recipes",
    props: {
      recipe: Array
    },
    data() {
      return {
        recipes: [],
        searchText: '',
        componentKey: 0,
      }
    },
    computed: {
      searchedRecipes () {return this.recipes.filter(rec => rec.title.toLowerCase().trim().search(this.searchText.toLowerCase().trim()) >= 0)},
      currentRecipe () {return this != null ? this.getCurrentRecipe() : ''}
    },
    created() {
      this.getRecipes();
    },
    methods: {
      async getRecipes() {
        try {
          let response = await axios.get("/api/recipes");
          this.recipes = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      forceRerender() {
        this.componentKey += 1;
      },
      select(recipeID) {
        this.$root.$data.currentRecipe = recipeID;
        this.forceRerender();
      },
      getCurrentRecipe() {
        for (let recipe of this.recipes) {
          if (recipe._id == this.$root.$data.currentRecipe) {
            return recipe;
          }
        }
        return null;
      }
    }
  }
</script>

<style>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .search {
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 50%;
  }

  form {
    display: table;
    width: 100%;
  }

  .fieldText {
    margin-right: 10px;
    font-size: 25px;
  }

  input {
    display: table-cell;
    font-size: 20px;
    border: none !important;
    box-shadow: none !important;
    width: 100%;
    height: 40px;
  }


  .recipes {
    margin-left: 45px;
    margin-right: 45px;
  }

  .content-right {
    text-align: left;
  }

  .recipe-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .recipe-link {
    display: block;
    background-color: #E5E5E5;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    text-align: center;
    font-size: 40px;
    color: #000000;
  }

  .recipe-link:hover {
    position: relative;
    bottom: 10px;
  }

  .recipe-link:active {
    color: #000000;
  }

  .recipe-img {
    width: 100%;
    height: auto;
  }

  .recipe-name {
    font-size: 6vw;
  }

  .recipe-page-img {
    width: 25%;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto; /**/
    border: 4px solid black;
    border-radius: 5px; /**/
  }

  .ingredients, .instructions {
    margin-left: 25px;
    line-height: 1.5;
  }

  .ingredient-section, .instruction-section {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .citation {
    margin-bottom: 10px;
  }

  .citation a {
    color: blue;
    text-decoration: none;
  }

  .citation a:hover {
    color: lightblue;
  }

  /* Tablet Styles */
  @media only screen and (min-width: 501px) and (max-width: 960px) {
    .recipe-img {
      height: 75%;
      width: 100%;
    }

    .recipe-name {
      font-size: 2vw;
    }

    .ingrediant-subsections {
      display: flex;
      flex-wrap: wrap;
    }

    .ingrediant-subsection {
      margin-right: 10px;
    }
  }

  /* Small Desktop Styles */
  @media only screen and (min-width: 961px) {
    .recipe-link {
      width: 25%;
      height: auto;
      padding: 20px;
      font-size: 25px;
    }

    .recipe-img {
      height: 85%;
      width: 100%;
    }

    .recipe-name {
      font-size: 1.5vw;
    }

    .ingrediant-subsections {
      display: flex;
      flex-wrap: wrap;
    }

    .ingrediant-subsection {
      margin-right: 30px;
    }
  }
</style>
