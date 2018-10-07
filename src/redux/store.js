import reducer from "./reducers";
import { createStore } from "redux";

const initialState = {
  notes: [
    {
      noteTitle: "New Note",
      noteContent: "",
      isSelected: true,
      isChecked: false
    }
  ],

  selectedNoteIndex: 0,
  filter: ""
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
