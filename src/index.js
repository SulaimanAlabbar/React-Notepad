import React from "react";
import ReactDOM from "react-dom";
import Notepad from "./notepad";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Notepad />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
