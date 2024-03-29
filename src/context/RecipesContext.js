import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

//create context reference to be invoked from other components
export const RecipesContext = createContext();
//Provider contains  functions and state to share whit other components
const RecipesProvider = (props) => {
  //useState to handle the recipes API retrieved data
  const [recipes, handleRecipes] = useState([]);
  //destructutin funcion from app send here by App component
  const { handleSpinner } = props;

  //useState to handle te call to request API
  const [search_recipes, handleSearchRecipes] = useState({
    name: "",
    category: "",
  });
  //use state to enable the API request function
  const [request, handleRequest] = useState(false);

  //destructuring search_recipes state
  const { name, category } = search_recipes;
  useEffect(() => {
    if (request) {
      const requestRecipesAPI = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}&c=${category}`;
        const response = await axios.get(url);

        handleSpinner(true);
        setTimeout(() => {
          //hide the spinner aftter 1.5 seg
          handleSpinner(false);

          //state data response in recipes hook to be used in other components
          handleRecipes(response.data.drinks);
        }, 1300);
      };

      requestRecipesAPI();
    }
  }, [search_recipes]);

  return (
    <RecipesContext.Provider
      value={{
        recipes,

        handleSearchRecipes,
        handleRequest,
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
