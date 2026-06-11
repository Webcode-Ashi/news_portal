import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllNews } from '../services/api';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (category, { rejectWithValue }) => {
    try {
      const data = await fetchAllNews(category);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  articles: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    toggleBookmark: (state, action) => {
      const article = action.payload;
      const existingIndex = state.bookmarks.findIndex(b => b.id === article.id);
      if (existingIndex >= 0) {
        state.bookmarks.splice(existingIndex, 1);
      } else {
        state.bookmarks.push(article);
      }
      localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { toggleBookmark } = newsSlice.actions;
export default newsSlice.reducer;
