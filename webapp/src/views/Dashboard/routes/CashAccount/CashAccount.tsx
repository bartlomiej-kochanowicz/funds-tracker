import { useParams } from 'react-router-dom';

export const CashAccount = () => {
  const { uuid } = useParams();

  return <div>{uuid}</div>;
};
