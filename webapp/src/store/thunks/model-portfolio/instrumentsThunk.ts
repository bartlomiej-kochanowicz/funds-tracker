import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  getModelPortfolioInstruments,
  InstrumentsResponse,
} from 'services/model-portfolio/instruments';
import { RequestReject } from 'types/service';
import { RejectValue } from 'types/store';

export const instrumentsThunk = createAsyncThunk<InstrumentsResponse, undefined, RejectValue>(
  'model-portfolio/instruments',
  async (none, { rejectWithValue }) => {
    try {
      const { data } = await getModelPortfolioInstruments();

      return data;
    } catch (err) {
      const error = err as AxiosError<RequestReject>;

      return rejectWithValue({
        message: error.response?.data.message ?? 'service.unknown_error',
        code: error.code,
      });
    }
  },
);
