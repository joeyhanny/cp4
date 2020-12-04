<template>
  <div class="about">
    <h1>About Us</h1>
    <img class="about-page-img" src="/images/jed-villejo-bEcC0nyIp2g-unsplash.jpg" alt="">
    <p class="about-bio">My family likes to cook. We usually try to make things from restaurants or other cultures.
      We also tend to be lazy. Because of this, we try to find the simplest recipes on the internet to make many different kinds of foods.
      Over time, we've acquired many different recipes from many different sites. The problem with these sites is that they are also blogs.
      Because of the long blogs, life stories, and copious ads that have to load on these websites, it would always take a while to finally get to the recipe.
      Couch and Potato is a storage for all of these recipes just for the family. It's not commercial, so it's quick and easy for the family to get to a recipe.
      All the recipes have a link to the original website so we can give credit where it's due and reference it when needed.</p>
  </div>
</template>

<style>
  .about {
    margin-left: 45px;
    margin-right: 45px;
  }

  .about-page-img {
    float: left;
    width: 50%;
    height: auto;
    margin-right: 20px;
    margin-top: 10px;
  }

  .about-bio {
    text-align: left;
    line-height: 1.5;
  }

  /* Tablet Styles */
  @media only screen and (min-width: 501px) and (max-width: 960px) {
    .about-page-img {
      width: 40%;
    }

    .about-bio {
      font-size: 20px;
    }

  }

  /* Small Desktop Styles */
  @media only screen and (min-width: 961px) {
    .about-page-img {
      width: 30%;
    }

    .about-bio {
      font-size: 30px;
    }


  }
</style>
