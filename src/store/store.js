import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    theme: themeReducer,
  },
});
