import { FC } from 'react';
import { AiFillGold } from 'react-icons/ai';
import { BsCash } from 'react-icons/bs';
import { MdAccountBalance } from 'react-icons/md';
import { FaPiggyBank, FaMoneyCheckAlt, FaBitcoin, FaRocket } from 'react-icons/fa';
import { RiStockFill } from 'react-icons/ri';
import type { InstrumentType } from 'types/instrument.type';
import { Wrapper } from './InstrumentSymbol.style';

interface InstrumentSymbolProps {
  type: InstrumentType;
}

export const InstrumentSymbol: FC<InstrumentSymbolProps> = ({ type }) => {
  const icons = {
    cash: BsCash,
    'saving-accounts': MdAccountBalance,
    deposits: FaPiggyBank,
    stocks: RiStockFill,
    bonds: FaMoneyCheckAlt,
    commodies: AiFillGold,
    crypto: FaBitcoin,
    others: FaRocket,
  };

  const Icon = icons[type];

  return (
    <Wrapper>
      <Icon
        color="white"
        size="24"
      />
    </Wrapper>
  );
};
