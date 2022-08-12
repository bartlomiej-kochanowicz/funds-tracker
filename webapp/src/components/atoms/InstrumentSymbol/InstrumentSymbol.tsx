import { InstrumentType } from 'services/model-portfolio/instruments';
import { AiFillGold } from 'react-icons/ai';
import { BsCash } from 'react-icons/bs';
import { MdAccountBalance } from 'react-icons/md';
import { FaPiggyBank, FaMoneyCheckAlt, FaBitcoin, FaRocket } from 'react-icons/fa';
import { RiStockFill } from 'react-icons/ri';
import { Wrapper } from './InstrumentSymbol.style';

interface InstrumentSymbolProps {
  type: InstrumentType;
}

export const InstrumentSymbol = ({ type }: InstrumentSymbolProps) => {
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
