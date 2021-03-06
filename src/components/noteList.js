import React from "react";
import List from "@material-ui/core/List";
import Note from "./note";
import * as actionCreators from "../actions/actionCreators";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    notes: state.notes,
    filter: state.filter
  };
};

const mapDispatchToProps = actionCreators;

class NoteList extends React.Component {
  constructor() {
    super();

    this.updateCheck = this.updateCheck.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
    this.loadNotes = this.loadNotes.bind(this);
  }

  updateSelection(index) {
    this.props.selectNote(index);
  }

  updateCheck(index) {
    this.props.toggleCheck(index);
  }

  loadNotes(notes) {
    return notes
      .filter(note =>
        note.noteTitle.toLowerCase().includes(this.props.filter.toLowerCase())
      )
      .map((note, index) => (
        <Note
          noteTitle={note.noteTitle}
          isSelected={note.isSelected}
          onSelect={() => this.updateSelection(index)}
          isChecked={note.isChecked}
          onCheck={() => this.updateCheck(index)}
          key={note.noteTitle + index}
        />
      ));
  }

  render() {
    return <List component="nav"> {this.loadNotes(this.props.notes)} </List>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList);
