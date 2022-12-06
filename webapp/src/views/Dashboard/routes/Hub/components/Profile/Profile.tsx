import { useTranslation } from 'react-i18next';
import { Row } from 'simple-flexbox';
import { Avatar, Spreader, Text } from 'components/atoms';
import wavingHand from 'assets/illustrations/waving_hand.png';
import { useUserContext } from 'contexts/UserContext';
import { WavingHand } from './Profile.styles';

export const Profile = () => {
  const { user } = useUserContext();

  const { t } = useTranslation();

  return (
    <Row alignItems="center">
      <Avatar name={user.name} />

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
