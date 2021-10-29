import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';


function App() {
  const APP_ID =  "159146cc";
  const APP_KEY = "3402960c25dd9b691ad5f9bcfa4ddb63";
  

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);
  
  const getRecipes= async () =>{
    let req = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const res= await fetch(req);
    const data= await res.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => { 
    setSearch(e.target.value);
  }

  const updateQuery = e => {
    e.preventDefault();
    setQuery(search);
  }
  return (
      <div className="App">
        <form className="search-form" onSubmit={updateQuery}>
          <input type="text" className="search-bar" value={search} onChange={updateSearch}></input>
          <button type="submit" className="search-button">Search</button>
        </form>
        <div className="recipes">
        {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.uri} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>))};
        </div>
      </div>
  );
}

export default App;
