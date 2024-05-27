// Define action types
const ActionTypes = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    RESET: 'RESET'
};

// Define action creators
const increment = () => ({ type: ActionTypes.INCREMENT });
const decrement = () => ({ type: ActionTypes.DECREMENT });
const reset = () => ({ type: ActionTypes.RESET });

// Define the initial state
const initialState = { count: 0 };

// Define the reducer
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

// Define the store creator
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

// Create the store
const store = createStore(reducer);

// Function to update the DOM
const updateDOM = () => {
    document.getElementById('count-el').innerText = store.getState().count;
};

// Subscribe the updateDOM function to the store
store.subscribe(updateDOM);

// Subscribe a listener to log state changes to the console
store.subscribe(() => console.log("Current state:", store.getState()));

// Add event listeners to buttons
document.getElementById('increment-btn').addEventListener('click', () => store.dispatch(increment()));
document.getElementById('decrement-btn').addEventListener('click', () => store.dispatch(decrement()));
document.getElementById('reset-btn').addEventListener('click', () => store.dispatch(reset()));

// Initial DOM update
updateDOM();
