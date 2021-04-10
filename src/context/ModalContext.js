import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

//context reference
export const ModalContext = createContext();

const ModalProvider = (props) => {
  //state for recipesId when the user click on see recipe button
  const [recipe_id, handleRecipeId] = useState(null);
  //state for the full recipe info retrieved from the API
  const [full_recipe, handleFullRecipe] = useState({});

  //once there is  a recipe id in the recipe_id state request the API to get full recipe info
  useEffect(() => {
    const getFullRecipe = async () => {
      if (!recipe_id) return;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipe_id}`;
      const response = await axios.get(url);
      handleFullRecipe(response.data.drinks[0]); //state the api response in full_recipe
    };
    getFullRecipe();
  }, [recipe_id]);

  return (
    <ModalContext.Provider
      value={{ full_recipe, handleRecipeId, handleFullRecipe }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
