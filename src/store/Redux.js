import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const userDeckSlice = createSlice({
    name: 'UserDeck',
    initialState: [],
    reducers: {
        addCard: (state, action) => {
            if (!state.includes(action.payload.id)){
                state.push(action.payload);
            } 
        },
        removeCard: (state, action) => {
            state = state.filter((it) => it.id !== action.payload);
            return state;
        },
    },
});

export const { addCard, removeCard } = userDeckSlice.actions;

const filterResult = createSlice({
    name: 'filters',
    initialState: [""],
    reducers: {
        addFilter: (state, action) => {
            state[0]=action.payload
        },
    },
});

export const { addFilter } = filterResult.actions;

export const store = configureStore({
    reducer: {
        UserDeck: userDeckSlice.reducer,
        filters: filterResult.reducer,
    },
});

