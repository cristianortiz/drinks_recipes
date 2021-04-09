import React, { createContext, useState } from "react";

//context reference
export const ModalContext = createContext();

const ModalProvider = (props) => {
  //state for recipesId when the user click on see recipe button
  const [recipe_id, handleRecipeId] = useState(null);

  return (
    <ModalContext.Provider value={{ handleRecipeId }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
