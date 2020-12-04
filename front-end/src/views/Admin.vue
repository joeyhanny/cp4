<template>
<div class="admin">
  <h1>Admin Page</h1>
    <div class="heading">
      <h2>Add a Recipe</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Title">
        <p></p>
        <input v-model="ingredientsHeader1" placeholder="Ingredients Header 1">
        <p></p>
        <textarea v-model="ingredientsList1" placeholder="Ingredients List 1"></textarea>
        <p></p>
        <input v-model="ingredientsHeader2" placeholder="Ingredients Header 2">
        <p></p>
        <textarea v-model="ingredientsList2" placeholder="Ingredients List 2"></textarea>
        <p></p>
        <textarea v-model="instructionList" placeholder="Instruction List"></textarea>
        <p></p>
        <input v-model="citationName" placeholder="Original Website Name">
        <p></p>
        <input v-model="citationURL" placeholder="Original Website URL">
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addRecipe">
        <h2>{{addRecipe.title}}</h2>
        <img :src="addRecipe.path" />
        <p>{{addRecipe.description}}</p>
      </div>
    </div>

    <div class="heading">
      <h2>Edit/Delete a Recipe</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectRecipe(s)">{{s.title}}
          </div>
        </div>
      </div>

      <div class="upload" v-if="findRecipe">
        <input v-model="findRecipe.title" placeholder="Title">
        <p></p>
        <input v-model="findRecipe.ingredientsHeader1" placeholder="Ingredients Header 1">
        <p></p>
        <textarea v-model="findRecipe.ingredientsList1" placeholder="Ingredients List 1"></textarea>
        <p></p>
        <input v-model="findRecipe.ingredientsHeader2" placeholder="Ingredients Header 2">
        <p></p>
        <textarea v-model="findRecipe.ingredientsList2" placeholder="Ingredients List 2"></textarea>
        <p></p>
        <textarea v-model="findRecipe.instructionList" placeholder="Instruction List"></textarea>
        <p></p>
        <input v-model="findRecipe.citationName" placeholder="Original Website Name">
        <p></p>
        <input v-model="findRecipe.citationURL" placeholder="Original Website URL">
        <p></p>
        <img :src="findRecipe.path" />
      </div>
      <div class="actions" v-if="findRecipe">
        <button @click="deleteRecipe(findRecipe)">Delete</button>
        <button @click="editRecipe(findRecipe)">Edit</button>
      </div>
    </div>
</div>
</template>

<style scoped>

  .admin {
    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: 40px;
  }

  .image h2 {
    font-style: italic;
    font-size: 1em;
  }

  .heading {
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .heading h2 {
    margin-top: 8px;
    margin-left: 10px;
  }

  .add,
  .edit {
    display: flex;
  }

  .circle {
    border-radius: 50%;
    width: 18px;
    height: 18px;
    padding: 8px;
    background: #333;
    color: #fff;
    text-align: center
  }

  /* Form */
  input,
  textarea,
  select,
  button {
    font-family: 'Montserrat', sans-serif;
    font-size: 1em;
  }

  .form {
    margin-right: 50px;
  }

  /* Uploaded images */
  .upload h2 {
    margin: 0px;
  }

  .upload img {
    max-width: 300px;
  }

  /* Suggestions */
  .suggestions {
    width: 200px;
    border: 1px solid #ccc;
  }

  .suggestion {
    min-height: 20px;
  }

  .suggestion:hover {
    background-color: #5BDEFF;
    color: #fff;
  }
</style>

<script>
  import axios from 'axios';
  export default {
    name: 'Admin',
    data() {
      return {
        title: "",
        ingredientsHeader1: "",
        ingredientsList1: "",
        ingredientsHeader2: "",
        ingredientsList2: "",
        instructionList: "",
        citationName: "",
        citationURL: "",
        file: null,
        addRecipe: null,
        recipes: [],
        findTitle: "",
        findRecipe: null,
      }
    },
    computed: {
      suggestions() {
        let recipes = this.recipes.filter(recipe => recipe.title.toLowerCase().includes(this.findTitle.toLowerCase()));
        return recipes.sort((a, b) => a.title > b.title);
      }
    },
    created() {
      this.getRecipes();
    },
    methods: {
      fileChanged(event) {
        this.file = event.target.files[0]
      },
      async upload() {
        try {
          const formData = new FormData();
          formData.append('photo', this.file, this.file.name)
          let r1 = await axios.post('/api/photos', formData);
          let r2 = await axios.post('/api/recipes', {
            title: this.title,
            path: r1.data.path,
            ingredientsHeader1: this.ingredientsHeader1,
            ingredientsList1: this.ingredientsList1,
            ingredientsHeader2: this.ingredientsHeader2,
            ingredientsList2: this.ingredientsList2,
            instructionList: this.instructionList,
            citationName: this.citationName,
            citationURL: this.citationURL
          });
          this.addRecipe = r2.data;
        } catch (error) {
          console.log(error);
        }
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
      selectRecipe(recipe) {
        this.findTitle = "";
        this.findRecipe = recipe;
      },
      async deleteRecipe(recipe) {
        try {
          await axios.delete("/api/recipe/" + recipe._id);
          this.findRecipe = null;
          this.getRecipes();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async editRecipe(recipe) {
        try {
          await axios.put("/api/recipe/" + recipe._id, {
            title: this.findRecipe.title,
            path: this.findRecipe.path,
            ingredientsHeader1: this.findRecipe.ingredientsHeader1,
            ingredientsList1: this.findRecipe.ingredientsList1,
            ingredientsHeader2: this.findRecipe.ingredientsHeader2,
            ingredientsList2: this.findRecipe.ingredientsList2,
            instructionList: this.findRecipe.instructionList,
            citationName: this.findRecipe.citationName,
            citationURL: this.findRecipe.citationURL
          });
          this.findRecipe = null;
          this.getRecipes();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
    }
  }
</script>
