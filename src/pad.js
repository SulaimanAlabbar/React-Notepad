import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import * as actionCreators from "./redux/actionCreators";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    padTitle:
      state.notes.length !== 0 && state.selectedNoteIndex !== -1
        ? state.notes[state.selectedNoteIndex].noteTitle
        : "",
    padContent:
      state.notes.length !== 0 && state.selectedNoteIndex !== -1
        ? state.notes[state.selectedNoteIndex].noteContent
        : "",
    length: state.notes.length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNoteTitle: text => dispatch(actionCreators.setNoteTitle(text)),
    setNoteContent: text => dispatch(actionCreators.setNoteContent(text))
  };
};

const styles = () => ({
  wrapper: {
    fontSize: "22pt",
    lineHeight: "1.2",
    margin: "5px"
  }
});

class Pad extends React.Component {
  constructor() {
    super();
    this.updatePadTitle = this.updatePadTitle.bind(this);
    this.updatePadContent = this.updatePadContent.bind(this);
  }

  updatePadTitle(e) {
    if (this.props.length === 0) return;

    if (e.target.value.length < 123) this.props.setNoteTitle(e.target.value);
    else window.alert("Title too long");
  }

  updatePadContent(e) {
    if (this.props.length === 0) return;
    this.props.setNoteContent(e.target.value);
  }

  render() {
    const { classes } = this.props;
    const { padTitle, padContent } = this.props;
    const grayPads =
      this.props.length === 0 ? { backgroundColor: "#EFEFEF" } : {};
    return (
      <div>
        <TextField
          placeholder="Add title"
          fullWidth
          value={padTitle}
          onChange={this.updatePadTitle}
          style={grayPads}
        />
        <TextField
          inputProps={{
            className: classes.wrapper
          }}
          multiline
          rows="15"
          margin="normal"
          fullWidth
          value={padContent}
          onChange={this.updatePadContent}
          style={grayPads}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Pad));
