import {createSlice} from '@reduxjs/toolkit';

const initialState = {boards: []};

export const BoardSlice = createSlice({
  name: 'BoardSlice',
  initialState,
  reducers: {
    addboard: (state, action) => {
      const newboard = action.payload;
      console.log(newboard);
      state.boards.push(newboard);
    },
    deleteboard: (state, action) => {
      const id = action.payload;
      const newboard = state.boards.filter(i => {
        return i !== id;
      });
      state.boards = newboard;
    },
  },
});

export const boardActions = BoardSlice.actions;
