// Import action types
import { updateData } from "./Action";

// Initial state
const initialState = {
  name: 'Dianna Russel',
  companyName: 'Shopping',
  price: '300',
  time: '12March',
};

// Reducer function
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case updateData:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
