import { useBreakpoint } from 'hooks/useBreakpoint';
import { renderHook } from '@testing-library/react-hooks';
import matchMediaPolyfill from 'mq-polyfill';
import { breakpoints } from '@styles/helpers/breakpoints';
import { act } from 'react-dom/test-utils';

describe('useBreakpoint tests', () => {
  beforeAll(() => {
    matchMediaPolyfill(window);
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
      }).dispatchEvent(new this.Event('resize'));
    };
  });

  it('change flag when window hit brakepoint "breakpoint-hd" for min', () => {
    window.resizeTo(breakpoints['breakpoint-hd'] + 1);

    const { result } = renderHook(() => useBreakpoint('breakpoint-hd', 'min'));

    expect(result.current).toBeTruthy();

    act(() => {
      window.resizeTo(breakpoints['breakpoint-hd'] - 1);
    });

    expect(result.current).toBeFalsy();
  });

  it('change flag when window hit brakepoint "breakpoint-hd" for max', () => {
    window.resizeTo(breakpoints['breakpoint-hd'] + 1);

    const { result } = renderHook(() => useBreakpoint('breakpoint-hd', 'max'));

    expect(result.current).toBeFalsy();

    act(() => {
      window.resizeTo(breakpoints['breakpoint-hd'] - 1);
    });

    expect(result.current).toBeTruthy();
  });
});
