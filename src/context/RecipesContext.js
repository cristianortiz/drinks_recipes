import React, { createContext, useState } from "react";

//create context reference to be invoked from other components
export const RecipesContext = createContext();

//Provider contains  functions and state to share whit other components
const RecipesProvider = (props) => {
  const [recipes, handleRecipes] = useState([]);

  //useState to handle
  const [search_recipes, handleSearchRecipes] = useState({
    name: "",
    category: "",
  });

  return (
    <RecipesContext.Provider value={{ handleSearchRecipes }}>
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
