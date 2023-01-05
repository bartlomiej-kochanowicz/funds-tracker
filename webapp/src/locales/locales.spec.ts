import en from './en-US.json';
import pl from './pl.json';

describe('locales tests', () => {
  test('Translations keys are the same for every language', () => {
    const translationKeysEn = Object.keys(en);
    const translationKeysPl = Object.keys(pl);

    expect(translationKeysEn).toEqual(translationKeysPl);
  });
});
