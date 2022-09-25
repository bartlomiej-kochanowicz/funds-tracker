import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from 'constants/store';
import { InstrumentsResponse } from 'services/model-portfolio/instruments';
import { instrumentsThunk } from 'store/thunks/model-portfolio/instrumentsThunk';
import { ErrorObject, RequestState } from 'types/store.type';

export const instrumentsSlice = createSlice({
  name: 'model-portfolio/instruments',
  initialState: {
    data: {} as InstrumentsResponse,
    status: STATUS.idle as RequestState,
    error: { code: undefined, message: undefined } as ErrorObject,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(instrumentsThunk.pending, state => {
      state.status = STATUS.pending;
    });

    builder.addCase(instrumentsThunk.fulfilled, (state, action) => {
      state.status = STATUS.fulfilled;
      state.data = action.payload;
    });

    builder.addCase(instrumentsThunk.rejected, (state, action) => {
      state.status = STATUS.rejected;
      state.error = {
        code: action.error?.code ?? undefined,
        message: action.payload?.message ?? undefined,
      };
    });
  },
});
