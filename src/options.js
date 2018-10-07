import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Star from "@material-ui/icons/Star";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import classNames from "classnames";
import * as actionCreators from "./redux/actionCreators";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    selectedNoteIndex: state.selectedNoteIndex,
    fileName:
      state.selectedNoteIndex !== -1
        ? state.notes[state.selectedNoteIndex].noteTitle
        : -1,
    fileContent:
      state.selectedNoteIndex !== -1
        ? state.notes[state.selectedNoteIndex].noteContent
        : -1,
    lastIndex: state.notes.length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    delNote: () => dispatch(actionCreators.delNote()),
    addNote: () => dispatch(actionCreators.addNote()),
    setNoteTitle: text => dispatch(actionCreators.setNoteTitle(text)),
    setNoteContent: text => dispatch(actionCreators.setNoteContent(text)),
    selectNote: index => dispatch(actionCreators.selectNote(index))
  };
};

const variantIcon = {
  success: CheckCircleIcon
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

class Options extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      Transition: null
    };

    this.onDelete = this.onDelete.bind(this);
    this.onDownload = this.onDownload.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }

  onDelete() {
    this.props.delNote();
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  onDownload = Transition => () => {
    if (this.props.fileName !== -1) {
      this.setState({ open: true, Transition });
      this.download(this.props.fileName, this.props.fileContent);
    } else {
      window.alert("No selected note");
    }
  };

  download(title, content) {
    title = title !== "" ? title + ".txt" : "text.txt";

    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(content)
    );
    element.setAttribute("download", title);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  onUpload = file => {
    this.props.addNote();
    this.props.selectNote(this.props.lastIndex);
    const fileReader = new FileReader();
    fileReader.onloadend = this.handleFileRead;
    fileReader.readAsText(file);
    this.props.setNoteTitle(file.name.slice(0, -4));
  };

  handleFileRead = data => {
    this.props.setNoteContent(data.currentTarget.result);
  };

  render() {
    const { classes } = this.props;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <div style={{ order: "1" }}>
          <IconButton>
            <DeleteIcon onClick={() => this.onDelete()} />
          </IconButton>
        </div>

        <div style={{ order: "2" }}>
          <IconButton onClick={this.onDownload(TransitionUp)}>
            <SaveIcon />
          </IconButton>

          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            TransitionComponent={this.state.Transition}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
          >
            <MySnackbarContentWrapper
              onClose={this.handleClose}
              variant="success"
              className={classes.margin}
              message={this.props.fileName}
            />
          </Snackbar>
        </div>

        <input
          accept=".txt"
          className={classes.input}
          id="uploadFile"
          type="file"
          onChange={e => this.onUpload(e.target.files[0])}
        />

        <div style={{ order: "3" }}>
          <label htmlFor="uploadFile">
            <IconButton component="span">
              <CloudUploadIcon />
            </IconButton>
          </label>
        </div>

        <div style={{ order: "4" }}>
          <IconButton>
            <Star />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Options));
