// Define actions
const ActionTypes = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    RESET: 'RESET'
  };
  
  // Define action creators
  const increment = () => ({ type: ActionTypes.INCREMENT });
  const decrement = () => ({ type: ActionTypes.DECREMENT });
  const reset = () => ({ type: ActionTypes.RESET });
  
  // Define reducer
  const initialState = { count: 0 };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.INCREMENT:
        return { ...state, count: state.count + 1 };
      case ActionTypes.DECREMENT:
        return { ...state, count: state.count - 1 };
      case ActionTypes.RESET:
        return { ...state, count: 0 };
      default:
        return state;
    }
  };
  
  // Create store
  const createStore = (reducer) => {
    let state = reducer(undefined, {});
    const listeners = [];
  
    const getState = () => state;
  
    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };
  
    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      };
    };
  
    dispatch({}); // Initialize state
  
    return { getState, dispatch, subscribe };
  };
  
  // Create store
  const store = createStore(reducer);
  
  // Dispatch actions
  store.dispatch(increment()); // Increment the count
  console.log("Current state:", store.getState());
  store.dispatch(increment()); // Increment the count again
  console.log("Current state:", store.getState());
  store.dispatch(decrement()); // Decrement the count
  console.log("Current state:", store.getState());
  store.dispatch(reset());    // Reset the count to 0
  
  // Log the current state
  console.log("Current state:", store.getState());
  