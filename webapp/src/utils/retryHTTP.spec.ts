/* eslint-disable prefer-promise-reject-errors */
import { getModelPortfolioInstruments } from 'services/model-portfolio/instruments';
import { retryHTTP } from './retryHTTP';

jest.mock('services/model-portfolio/instruments', () => ({
  getModelPortfolioInstruments: jest.fn(),
}));

jest.mock('services/auth/refresh', () => ({ refresh: jest.fn() }));

describe('retryHTTP', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should try only once if succeeds', async () => {
    const mock = getModelPortfolioInstruments as jest.Mock;
    mock.mockResolvedValueOnce([]);
    const retryGetModelPortfolioInstruments = retryHTTP(getModelPortfolioInstruments, {
      maxAttempts: 3,
    });

    expect(retryGetModelPortfolioInstruments()).resolves.toEqual([]);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('should try at most n times and return value if succeeded', async () => {
    const mock = getModelPortfolioInstruments as jest.Mock;
    mock
      .mockImplementationOnce(() => Promise.reject('kaboom! A-1'))
      .mockImplementationOnce(() => Promise.reject('kaboom! A-2'))
      .mockImplementationOnce(() => Promise.resolve([]));
    const retryGetModelPortfolioInstruments = retryHTTP(getModelPortfolioInstruments, {
      maxAttempts: 3,
    });

    try {
      const result = await retryGetModelPortfolioInstruments();
      expect(result).toEqual([]);
    } catch (e) {
      fail('should not reach this point');
    }
    expect(mock).toHaveBeenCalledTimes(3);
  });

  it('should try at most n times and fail afterwards', async () => {
    const mock = getModelPortfolioInstruments as jest.Mock;
    mock.mockImplementation(() => Promise.reject('kaboom! B-1'));
    const retryGetModelPortfolioInstruments = retryHTTP(getModelPortfolioInstruments, {
      maxAttempts: 3,
    });

    try {
      await retryGetModelPortfolioInstruments();
      fail('should not reach this point');
    } catch (e) {
      expect(e).toEqual('kaboom! B-1');
    }
    expect(mock).toHaveBeenCalledTimes(3);
  });
});
