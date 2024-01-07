

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  darkMode?: boolean | undefined;
}

const initialState: ThemeState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
