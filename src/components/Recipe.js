import React, { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

const Recipe = ({ recipe }) => {
  //destructuring and using state handle function from ModalContext
  const { handleRecipeId } = useContext(ModalContext);

  return (
    <div className="col-md-4 bm-3">
      <div className="card">
        <h2 className="card-header">{recipe.strDrink}</h2>
        <img
          className="card-img-top"
          src={recipe.strDrinkThumb}
          alt={`image of${recipe.strDrink}`}
        />
        <div className="card-body">
          <button
            onClick={() => {
              //store the id of a recipe in ModalContext state
              handleRecipeId(recipe.idDrink);
            }}
            type="button"
            className="btn btn-block btn-primary"
          >
            See Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
