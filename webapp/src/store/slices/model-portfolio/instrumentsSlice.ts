import { createSlice } from '@reduxjs/toolkit';
import { InstrumentsResponse } from 'services/model-portfolio/instruments';
import { instrumentsThunk } from 'store/thunks/model-portfolio/instrumentsThunk';
import { ErrorObject, RequestState } from 'types/store';

export const signInSlice = createSlice({
  name: 'model-portfolio/instruments',
  initialState: {
    data: {} as InstrumentsResponse,
    status: 'idle' as RequestState,
    error: { code: undefined, message: undefined } as ErrorObject,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(instrumentsThunk.pending, state => {
      state.status = 'pending';
    });

    builder.addCase(instrumentsThunk.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.data = action.payload;
    });

    builder.addCase(instrumentsThunk.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = {
        code: action.error?.code ?? undefined,
        message: action.payload?.message ?? undefined,
      };
    });
  },
});
