import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from 'constants/store';
import { InstrumentsResponse } from 'services/model-portfolio/instruments';
import { instrumentsThunk } from 'store/thunks/model-portfolio/instrumentsThunk';
import { ErrorObject, RequestState } from 'types/store';

export const instrumentsSlice = createSlice({
  name: 'model-portfolio/instruments',
  initialState: {
    data: {} as InstrumentsResponse,
    status: 'idle' as RequestState,
    error: { code: undefined, message: undefined } as ErrorObject,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(instrumentsThunk.pending, state => {
      state.status = STATUS.PENDING;
    });

    builder.addCase(instrumentsThunk.fulfilled, (state, action) => {
      state.status = STATUS.FULFILLED;
      state.data = action.payload;
    });

    builder.addCase(instrumentsThunk.rejected, (state, action) => {
      state.status = STATUS.REJECTED;
      state.error = {
        code: action.error?.code ?? undefined,
        message: action.payload?.message ?? undefined,
      };
    });
  },
});
