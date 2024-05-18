import {createSlice} from '@reduxjs/toolkit';
import {create} from 'react-test-renderer';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const {id, name} = action.payload; // Extract id and name from payload
      const itemPresent = state.cart.find(item => item.id === id);
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
    },

    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        item => item.id !== action.payload.id,
      );
      state.cart = removeItem;
    },
    increamentQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        item => item.id === action.payload.id,
      );
      itemPresent.quantity++;
    },
    decreamentQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        item => item.id === action.payload.id,
      );
      if (itemPresent.quantity === 1) {
 
        const removeItem = state.cart.filter(
          item => item.id !== action.payload.id,
        );
        state.cart = removeItem;
      } else {
        itemPresent.quantity--;
      }
    },
    cleanCart: state => {
      state.cart = [];
    },
    getItemCount: (state, action) => {
      const countableItem = state.cart.find(
        item => item.id === action.payload.id,
      );
      return countableItem ? countableItem.quantity : 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increamentQuantity,
  decreamentQuantity,
  cleanCart,
  getItemCount,
} = CartSlice.actions;

export default CartSlice.reducer;
