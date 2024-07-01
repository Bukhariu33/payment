// actions.js

export const ADD_DATA = 'ADD_DATA';

export const addData = (newData) => ({
  type: ADD_DATA,
  payload: newData,
});
