import { RootState } from 'store';

export const selectInstruments = (state: RootState) => state.modelPortfolio.instruments;
