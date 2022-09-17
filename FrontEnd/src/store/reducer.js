// Redux is most commonly used in situations when:
// Application has a large amount of state, needed in many components.
// Application state is updated frequently.
// The logic to update the application state is complex.

// To initialize Redux, we need to wrap the whole App component inside the Redux Provider and initialize the store.

// The last part is accessing the state, which can be done by connecting the component to a state.

// Actions
// Actions are objects that are used to send data to the Redux store. They typically have two properties: a type property for describing what the action does and a payload property that contains the information that should be changed in the app state

// Reducers
// Reducers are pure functions that implement the action’s behavior. They take the current application state, perform an action, and then return a new state

// The application’s state is housed in the store. There is only one store in any Redux application:

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  transaction: [],
};

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    getTransactions: (state) => {},
  }, // this is the reducer... with redux toolkit theres no need to create actions
});

export const { getTransactions } = expenseSlice.actions;
export default expenseSlice.reducer;
