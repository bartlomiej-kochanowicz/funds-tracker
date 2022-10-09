import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row } from 'simple-flexbox';
import { selectAccount } from 'store/selectors/account';
import { Avatar, Spreader, Text } from 'components/atoms';
import wavingHand from 'assets/illustrations/waving_hand.png';
import { WavingHand } from './Profile.styles';

export const Profile = () => {
  const { data } = useSelector(selectAccount);

  const { t } = useTranslation();

  return (
    <Row alignItems="center">
      <Avatar name={data.name} />

      <Spreader spread="tiny" />

      <Text
        fontWeight="700"
        fontSize="1.5"
      >
        {t('common.hi')}, {data.name}!
      </Text>

      <Spreader spread="tiny" />

      <WavingHand
        src={wavingHand}
        loading="lazy"
        alt="Waving hand"
        width="40px"
      />
    </Row>
  );
};

Profile.displayName = 'HubProfile';
