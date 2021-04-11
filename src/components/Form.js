import React, { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";
import { RecipesContext } from "../context/RecipesContext";

const Form = () => {
  //get data from CategoryContext
  const { categorys } = useContext(CategoryContext);

  //get state handle function from RecipesProvider
  const { handleSearchRecipes, handleRequest, handleSpinner } = useContext(
    RecipesContext
  );

  //local useState to state specifics form inputs data
  const [search, handleSearch] = useState({
    name: "",
    category: "",
  });
  //useState hook to keetp track form validations error
  const [error, handleError] = useState(false);
  //destructuring state form inputs
  const { name, category } = search;

  //get data from user inputs in the form
  const getRecipesData = (e) => {
    //useState handle function to state inputs value
    handleSearch({
      ...search, //copy of search state
      [e.target.name]: e.target.value,
    });
  };
  //when user submit the form
  const submitRecipesForm = (e) => {
    e.preventDefault();

    //simple form validation
    if (name.trim() === "" || category.trim() === "") {
      handleError(true);
      return;
    }
    handleError(false);

    //state form input values to requestAPI in the RecipesContext
    handleSearchRecipes(search);
    //enable the useEffect hook to call the API in RecipesContext
    handleRequest(true);
  };
  //on form Submit event call the recipesContext state function to state the inputs values
  return (
    <form onSubmit={submitRecipesForm} className="col-12">
      <fieldset className="text-center">
        <legend>Search Cocktails by Category or Ingredients</legend>
      </fieldset>
      {error ? (
        <p className="alert alert-danger text-center p-2">
          Both fields are mandatory
        </p>
      ) : null}
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
