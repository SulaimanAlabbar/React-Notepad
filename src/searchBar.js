import React from "react";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "./Images/search.svg";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import * as actionCreators from "./redux/actionCreators";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    lastIndex: state.notes.length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNote: () => dispatch(actionCreators.addNote()),
    selectNote: index => dispatch(actionCreators.selectNote(index))
  };
};

class SearchBar extends React.Component {
  constructor() {
    super();

    this.updateFilter = this.updateFilter.bind(this);
    this.addNote = this.addNote.bind(this);
  }
  updateFilter(e) {
    // store.dispatch(actionCreators.setFilter(e.target.value));
  }

  addNote() {
    this.props.addNote();
    this.props.selectNote(this.props.lastIndex);
  }

  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div style={{ order: "1" }}>
          <TextField
            onChange={this.updateFilter}
            style={{ width: "300px" }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={SearchIcon} alt="searchicon" />
                </InputAdornment>
              )
            }}
          />
        </div>
        <div style={{ order: "2", marginLeft: "30px", marginBottom: "5px" }}>
          <Button
            variant="fab"
            mini
            aria-label="Add"
            onClick={() => this.addNote()}
          >
            <AddIcon />
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
