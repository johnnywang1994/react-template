import { createStore } from 'redux'
import { Actions, ActionTypes } from './action'

// actions
let { Switch_Page } = ActionTypes;


const reducer = (state, action) => {
  let newState = {...state};

  switch (action.type) {
    case Switch_Page:
      newState.subPageOpen = !newState.subPageOpen;
      return newState;
    default:
      return state;
  }
}


// Store
export const stateStore = createStore(reducer, {
  subPageOpen: false
});



// bound
export const boundSwitchPage = () => {
  return stateStore.dispatch(Actions.switchPage())
}