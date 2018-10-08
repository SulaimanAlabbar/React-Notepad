import {
  ADD_FILTER,
  ADD_NOTE,
  DELETE_NOTE,
  STAR_NOTE,
  SELECT_NOTE,
  TOGGLE_CHECK,
  SET_NOTE_TITLE,
  SET_NOTE_CONTENT
} from "../actions/actionTypes";

function reducer(state, action) {
  switch (action.type) {
    case ADD_FILTER:
      return { ...state, filter: action.text };

    case ADD_NOTE:
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            noteTitle: "New Note",
            noteContent: "",
            isSelected: false,
            isChecked: false
          }
        ]
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => !note.isChecked),
        selectedNoteIndex:
          state.selectedNoteIndex === -1
            ? -1
            : state.notes[state.selectedNoteIndex].isChecked
              ? -1
              : state.selectedNoteIndex -
                state.notes.filter(
                  (note, index) =>
                    note.isChecked && index < state.selectedNoteIndex
                ).length
      };

    case SELECT_NOTE:
      return {
        ...state,
        notes: state.notes.map((note, index) => ({
          ...note,
          isSelected: action.index === index
        })),
        selectedNoteIndex: action.index
      };

    case TOGGLE_CHECK:
      return {
        ...state,
        notes: [
          ...state.notes.slice(0, action.index),
          {
            ...state.notes[action.index],
            isChecked: !state.notes[action.index].isChecked
          },
          ...state.notes.slice(action.index + 1)
        ]
      };

    case SET_NOTE_TITLE:
      return {
        ...state,
        notes: [
          ...state.notes.slice(0, state.selectedNoteIndex),
          {
            ...state.notes[state.selectedNoteIndex],
            noteTitle: action.text
          },
          ...state.notes.slice(state.selectedNoteIndex + 1)
        ]
      };

    case SET_NOTE_CONTENT:
      return {
        ...state,
        notes: [
          ...state.notes.slice(0, state.selectedNoteIndex),
          {
            ...state.notes[state.selectedNoteIndex],
            noteContent: action.text
          },
          ...state.notes.slice(state.selectedNoteIndex + 1)
        ]
      };

    default:
      return state;
  }
}

export default reducer;
