import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false, // Forced to light mode for Red & White theme
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      // Disabled
    },
    setTheme: (state, action) => {
      // Disabled
    }
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
