import { useContext, useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import RecipesList from "./components/RecipesList";
import Spinner from "./components/Spinner";
import CategoryProvider from "./context/CategoryContext";
import RecipesProvider from "./context/RecipesContext";
import ModalProvider from "./context/ModalContext";

function App() {
  //useState hook to  keep state of load animation spinner
  const [load_spinner, handleSpinner] = useState(false);
  //conditional statement to toggle spinner/RecipesList components
  const component = load_spinner ? <Spinner /> : <RecipesList />;

  //the order of providers component notation does not care, but nesting them must be consistent
  return (
    <CategoryProvider>
      <RecipesProvider handleSpinner={handleSpinner}>
        <ModalProvider>
          <Header />
          <div className="container mt-5">
            <div className="row">
              <Form />
            </div>

            {component}
          </div>
        </ModalProvider>
      </RecipesProvider>
    </CategoryProvider>
  );
}

export default App;
