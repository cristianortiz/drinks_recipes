import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";

import Modal from "@material-ui/core/modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Recipe = ({ recipe }) => {
  //modal config from materialUI
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }; //---End config materialUI modal

  //destructuring and using state handle function from ModalContext
  const { full_recipe, handleRecipeId, handleFullRecipe } = useContext(
    ModalContext
  );
  //bad API structure we need to loop and show the ingredients of a recipe
  const showIngredients = (full_recipe) => {
    let ingredients = [];
    //api retrieve 15 fix ingredients and some are null
    for (let i = 1; i < 16; i++) {
      if (full_recipe[`strIngredient${i}`]) {
        ingredients.push(
          <li>
            {full_recipe[`strMeasure${i}`]} of{" "}
            {full_recipe[`strIngredient${i}`]}
          </li>
        );
      }
    }
    return ingredients;
  };

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
              handleRecipeId(recipe.idDrink); //store the id of a recipe in ModalContext state
              handleOpen(); //set open state to true to show modal window
            }}
            type="button"
            className="btn btn-block btn-primary"
          >
            See Recipe
          </button>
          <Modal
            open={open}
            onClose={() => {
              handleRecipeId(null); //reset recipe_id state to null
              handleFullRecipe({}); //reset full_recipe state to empty object
              handleClose(); //reset open state to false to close modal window
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2>{full_recipe.strDrink} </h2>
              <h3 className="mt-4">How to make it</h3>
              <p>{full_recipe.strInstructions}</p>
              <img
                className="img-fluid my-4"
                src={full_recipe.strDrinkThumb}
              ></img>
              <h3> Ingredients</h3>
              <ul>{showIngredients(full_recipe)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
