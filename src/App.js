import { Fragment } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import RecipesList from "./components/RecipesList";
import CategoryProvider from "./context/CategoryContext";
import RecipesProvider from "./context/RecipesContext";
import ModalProvider from "./context/ModalContext";

function App() {
  //the order of providers component notation does not care, but nesting them must be consistent
  return (
    <CategoryProvider>
      <RecipesProvider>
        <ModalProvider>
          <Header />
          <div className="container mt-5">
            <div className="row">
              <Form />
            </div>
            <RecipesList />
          </div>
        </ModalProvider>
      </RecipesProvider>
    </CategoryProvider>
  );
}

export default App;
