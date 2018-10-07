import {
  ADD_FILTER,
  ADD_NOTE,
  DEL_NOTE,
  STAR_NOTE,
  SELECT_NOTE,
  TOGGLE_CHECK,
  SET_NOTE_TITLE,
  SET_NOTE_CONTENT
} from "./actionTypes";

export function addFilter(text) {
  return {
    type: ADD_FILTER,
    text: text
  };
}

export function addNote() {
  return {
    type: ADD_NOTE
  };
}

export function delNote() {
  return {
    type: DEL_NOTE
  };
}

export function selectNote(index) {
  return {
    type: SELECT_NOTE,
    index: index
  };
}

export function toggleCheck(index) {
  return {
    type: TOGGLE_CHECK,
    index: index
  };
}

export function setNoteTitle(text) {
  return {
    type: SET_NOTE_TITLE,
    text: text
  };
}

export function setNoteContent(text) {
  return {
    type: SET_NOTE_CONTENT,
    text: text
  };
}
