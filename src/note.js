import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const Note = ({ noteTitle, isSelected, onSelect, isChecked, onCheck }) => (
  <ListItem
    button
    selected={isSelected}
    onClick={onSelect}
    style={{ minHeight: "50px" }}
  >
    <ListItemText primary={noteTitle} style={{ wordWrap: "break-word" }} />
    <ListItemSecondaryAction>
      <Checkbox checked={isChecked} onClick={onCheck} />
    </ListItemSecondaryAction>
  </ListItem>
);
export default Note;
