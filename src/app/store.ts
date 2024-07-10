import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlice";
const rootReducer = combineReducers({
  books: booksReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
