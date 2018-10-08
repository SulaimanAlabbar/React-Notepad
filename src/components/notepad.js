import React from "react";
import SearchBar from "./searchBar";
import NoteList from "./noteList";
import Options from "./options";
import Pad from "./pad";

const style = {
  maxWidth: "70%",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "auto auto",
  gridGap: "1em"
};

const Notepad = () => {
  return (
    <div style={style}>
      <SearchBar />
      <Options />
      <NoteList />
      <Pad />
    </div>
  );
};

export default Notepad;
