const { createStore } = require("redux");

const actions = {
  SET_HOSTNAME: "SET_HOSTNAME",
  SET_STATUS: "SET_STATUS",
  ADD_LINK: "ADD_LINK",
}

const { 
  SET_HOSTNAME,
  SET_STATUS,
  ADD_LINK
} = actions;

const initialState = {
  status: "INIT",
  hostname: false,
  uncrawled: [],
  output: {
    pages: []
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_HOSTNAME:
      return { 
        ...state,
        hostname: action.payload
      }
    case SET_STATUS:
      return {
        ...state,
        status: "COMPLETE"
      }
    case ADD_LINK:
      return {
        ...state,
        uncrawled: [...state.uncrawled, action.payload]
      }
    default:
      console.log("action unknown")
      // throw new Error("redux action unknown!")
      return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(reducer)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.


module.exports = store;