import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

//create context reference to be invoked from other components
export const CategoryContext = createContext();

//Provider contains functions and state
const CategoryProvider = (props) => {
  //create Context State
  const [categorys, handleCategory] = useState([]);

  //request the API for drinks category, empty dependency for one time load
  useEffect(() => {
    const requestAPICategorys = async () => {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
      const categorys = await axios.get(url);

      //state the API request in category hook, this will be shared whit other components
      handleCategory(categorys.data.drinks);
    };
    requestAPICategorys();
  }, []);

  //data and functions shared whit other components through provider value={}
  return (
    <CategoryContext.Provider value={{ categorys }}>
      {props.children}
    </CategoryContext.Provider>
  );
};
export default CategoryProvider;
