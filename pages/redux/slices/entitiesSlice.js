import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProduct: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    updateProductByid: (state, action) => {
      const { id, updatedEntity } = action.payload;
      const index = state.findIndex((entity) => entity.id === id);
      if (index !== -1) {
        state[index] = updatedEntity;
      }
    },
    removeProduct: (state, action) => {
      const idToRemove = action.payload;
      return state.filter((entity) => entity.id !== idToRemove);
    },
  },
});

export const { setProduct, addProduct, updateProductByid, removeProduct} = productsSlice.actions;
export default productsSlice.reducer;