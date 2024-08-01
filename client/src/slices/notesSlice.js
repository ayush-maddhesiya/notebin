import { BASE_URL } from '@/constants/data';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token'); 

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get(`${BASE_URL}api/v1/file/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    items: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default notesSlice.reducer;
