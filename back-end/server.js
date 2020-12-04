const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/recipeBook', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for recipes in the recipe book: a title, a path to an image,
// an ingrediant list, a list of instruction steps, a citation, and a citation URL
const recipeSchema = new mongoose.Schema({
  title: String,
  path: String,
  ingredientsHeader1: String,
  ingredientsList1: String,
  ingredientsHeader2: String,
  ingredientsList2: String,
  instructionList: String,
  citationName: String,
  citationURL: String,
  ingrediantsArray: [[[String]]],
  instructionsArray: [String],
});

// Create a model for recipes in the recipe book.
const Recipe = mongoose.model('Recipe', recipeSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new recipe in the recipe book: takes everything in the schem for a recipe abaove (recipeSchema)
app.post('/api/recipes', async (req, res) => {
  let ingHead1 = req.body.ingredientsHeader1;
  let ingList1 = req.body.ingredientsList1;
  let ingHead2 = req.body.ingredientsHeader2;
  let ingList2 = req.body.ingredientsList2;
  let ingArray = makeIngredientsArray(ingHead1, ingList1, ingHead2, ingList2);
  let instructArray = paragraphToArray(req.body.instructionList);

  const recipe = new Recipe({
    title: req.body.title,
    path: req.body.path,
    ingredientsHeader1: ingHead1,
    ingredientsList1: ingList1,
    ingredientsHeader2: ingHead2,
    ingredientsList2: ingList2,
    instructionList: req.body.instructionList,
    citationName: req.body.citationName,
    citationURL: req.body.citationURL,
    ingrediantsArray: ingArray,
    instructionsArray: instructArray,
  });
  try {
    await recipe.save();
    res.send(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Turns a paragraph into an array of lines. Used to convert textarea steps into an array of steps
function paragraphToArray(paragraph) {
  let list = [];
  let tmp = "";
  for (let i = 0; i < paragraph.length; i++) {
    if (paragraph[i] != "\n") {
      tmp += paragraph[i];
    }
    else {
      list.push(tmp);
      tmp = "";
    }
  }

  if (tmp != "") {
    list.push(tmp);
    tmp = "";
  }

  return list;
}

function makeIngredientsArray(header1, paragraph1, header2, paragraph2) {
  let ingredientsArray = [];
  let subSection1Array = [];
  let subSection2Array = [];

  let subSection1SubArray = paragraphToArray(paragraph1);
  let subSection2SubArray = paragraphToArray(paragraph2);

  subSection1Array.push(header1);
  subSection1Array.push(subSection1SubArray);

  subSection2Array.push(header2);
  subSection2Array.push(subSection2SubArray);

  ingredientsArray.push(subSection1Array);
  ingredientsArray.push(subSection2Array);

  return ingredientsArray;
}

// Get a list of all of the recipes in the recipe book.
app.get('/api/recipes', async (req, res) => {
  try {
    let recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete a recipe
app.delete('/api/recipe/:id', async (req, res) => {
  try {
    await Recipe.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Edit a recipe
app.put('/api/recipe/:id', async (req, res) => {
  try {
    let recipe = await Recipe.findOne({
      _id: req.params.id
    });

    let ingHead1 = req.body.ingredientsHeader1;
    let ingList1 = req.body.ingredientsList1;
    let ingHead2 = req.body.ingredientsHeader2;
    let ingList2 = req.body.ingredientsList2;
    let ingArray = makeIngredientsArray(ingHead1, ingList1, ingHead2, ingList2);
    let instructArray = paragraphToArray(req.body.instructionList);

    recipe.title = req.body.title;
    recipe.path = req.body.path;
    recipe.ingredientsHeader1 = ingHead1;
    recipe.ingredientsList1 = ingList1;
    recipe.ingredientsHeader2 = ingHead2;
    recipe.ingredientsList2 = ingList2;
    recipe.citationName = req.body.citationName;
    recipe.citationURL = req.body.citationURL;
    recipe.ingrediantsArray = ingArray;
    recipe.instructionsArray = instructArray;

    recipe.save();

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
