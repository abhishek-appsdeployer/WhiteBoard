import {createSlice, configureStore} from '@reduxjs/toolkit';
import {BoardSlice} from './BoardSlice';

const initialState = {value: []};

export const ImageSlice = createSlice({
  name: 'ImageSlice',
  initialState,
  reducers: {
    addimage: (state, action) => {
      const image = action.payload;
      console.log('image', image);
      //   console.log(state.value);
      state.value.push(image);
    },
    deleteimage: (state, action) => {
      const id = action.payload;
      console.log('action', id.id);

      const findimage = state.value.filter(i => {
        return i.id != id.id;
      });
      console.log(state.value);
      state.value = findimage;
      console.log('findimage', findimage);
    },
  },
});

export const Store = configureStore({
  reducer: {
    imageslice: ImageSlice.reducer,
    boardslice: BoardSlice.reducer,
  },
});

export const imageSliceAction = ImageSlice.actions;
