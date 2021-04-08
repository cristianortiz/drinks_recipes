import React, { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";
import { RecipesContext } from "../context/RecipesContext";

const Form = () => {
  //get data from CategoryProvider
  const { categorys } = useContext(CategoryContext);

  //get state handle function from RecipesProvider
  const { handleSearchRecipes } = useContext(RecipesContext);

  //local useState to state specifics form inputs data
  const [search, handleSearch] = useState({
    name: "",
    category: "",
  });

  //get data from user inputs in the form
  const getRecipesData = (e) => {
    //useState handle function to state inputs value
    handleSearch({
      ...search, //copy of search state
      [e.target.name]: e.target.value,
    });
  };
  //on form Submit event call the recipesContext state function to state the inputs values
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchRecipes(search); //state form input values to requestAPI in the RecipesContext
      }}
      className="col-12"
    >
      <fieldset className="text-center">
        <legend>Search Cocktails by Category or Ingredients</legend>
      </fieldset>
      <div className="row mt-4">
        <div className="col-md-4">
          <input
            onChange={getRecipesData}
            className="form-control"
            name="name"
            type="text"
            placeholder="Search by ingredient"
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            name="category"
            onChange={getRecipesData}
          >
            <option value="">-- Select Category --</option>
            {categorys.map((category) => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Search Cocktails"
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
