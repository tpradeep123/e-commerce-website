const initialState = {
  products: {},
  user: {},
};

export default function RootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      state.products[action.payload[0]] = action.payload[1];
      console.log(state.products);
      return { products: state.products, user: state.user };

    case "EDIT_PRODUCT":
      state.products[action.payload[0]] = action.payload[1];
      console.log(state.products);
      return { products: state.products, user: state.user };

    case "DELETE_PRODUCT":
      delete state.products[action.payload[0]];
      return { products: state.products, user: state.user };

    case "ADD_USER":
      state.user = action.payload[0];
      return { products: state.products, user: state.user };

    case "CLEAR_CART":
      //state.user={}
      state.products = {};
      return { products: state.products, user: state.user };

    default:
      return { products: state.products, user: state.user };
  }
}
