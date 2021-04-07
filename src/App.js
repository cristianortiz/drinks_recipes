import { Fragment } from "react";
import Form from "./components/Form";
import Header from "./components/Header";

function App() {
  return (
    <Fragment>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <Form />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
