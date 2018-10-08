import React from "react";
import ReactDOM from "react-dom";
import Notepad from "./components/notepad";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Notepad />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
