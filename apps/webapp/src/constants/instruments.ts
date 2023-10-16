import { InstrumentType } from '__generated__/graphql';

const customSortKey = (item: InstrumentType): number => {
  // Define the commonness of each instrument (higher values indicate more common)
  const commonness: { [key: string]: number } = {
    stocks: 10,
    crypto: 9,
    etfs: 8,
    bonds: 7,
    governmentBonds: 6,
    commodities: 5,
    immovables: 4,
    movables: 3,
    options: 2,
    others: 1,
  };

  // If the instrument is not in the commonness object, assign it a default value of 0
  return commonness[item] || 0;
};

export default Object.values(InstrumentType).sort((a, b) => customSortKey(b) - customSortKey(a));
