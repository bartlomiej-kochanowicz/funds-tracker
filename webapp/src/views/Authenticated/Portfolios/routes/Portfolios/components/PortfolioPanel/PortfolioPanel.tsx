import { GetPortfoliosQuery } from '__generated__/graphql';
import { Box, Button, Dropdown, Icon, Text } from 'components/atoms';
import { ContentProps } from 'components/atoms/Dropdown';
import { useUserContext } from 'contexts/UserContext';
import { formatCurrency } from 'helpers/formatCurrency';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { FC } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { Column, Row } from 'simple-flexbox';

import { DropdownContent } from './components/DropdownContent';

interface PortfoliosPanelProps {
  updatePortfolioName: (data: { name: string; uuid: string }) => void;
  updatePortfolioList: (data: { uuid: string }) => void;
}

export const PortfolioPanel: FC<GetPortfoliosQuery['portfolios'][0] & PortfoliosPanelProps> = ({
  name,
  uuid,
  updatePortfolioName,
  updatePortfolioList,
}) => {
  const {
    user: { defaultCurrency },
  } = useUserContext();

  const isPhone = useBreakpoint('phone', 'max');

  const content = (props: ContentProps) => (
    <DropdownContent
      uuid={uuid}
      name={name}
      updatePortfolioName={updatePortfolioName}
      updatePortfolioList={updatePortfolioList}
      {...props}
    />
  );

  return (
    <Box
      p={isPhone ? 'medium' : 'large'}
      borderRadius="0.7"
    >
      <Row justifyContent="space-between">
        <Column>
          <Text fontWeight="700">{name}</Text>

          <Text>{formatCurrency(2137, defaultCurrency)}</Text>
        </Column>

        <Dropdown
          content={content}
          placement="bottom-end"
        >
          {props => (
            <Button
              outline
              size="small"
              {...props}
            >
              <Icon icon={FaEllipsisV} />
            </Button>
          )}
        </Dropdown>
      </Row>
    </Box>
  );
};
