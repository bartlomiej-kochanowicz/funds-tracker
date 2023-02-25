import { Text } from 'components/atoms';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Column } from 'simple-flexbox';
import { Colors } from 'styles/theme';

const data = [
  { uuid: '1', date: '1', balance: 0 },
  { uuid: '2', date: '2', balance: 1000 },
  { uuid: '3', date: '3', balance: 1000 },
  { uuid: '4', date: '4', balance: 1000 },
  { uuid: '5', date: '5', balance: 2000 },
  { uuid: '6', date: '6', balance: 3500 },
  { uuid: '7', date: '7', balance: 3500 },
  { uuid: '8', date: '8', balance: 3500 },
  { uuid: '9', date: '9', balance: 3500 },
  { uuid: '10', date: '10', balance: 4000 },
  { uuid: '11', date: '11', balance: 4500 },
  { uuid: '12', date: '12', balance: 4500 },
];

export const ErrorChart: FC = () => {
  const { t } = useTranslation();

  return (
    <Column>
      <Text fontColor="gray300">{t('error.failed_to_fetch')}</Text>

      <ResponsiveContainer
        height={126}
        /* resizing chart fix */
        width="99%"
      >
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="balance-error"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={Colors.Gray300}
                stopOpacity={0.6}
              />

              <stop
                offset="95%"
                stopColor={Colors.Gray300}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="balance"
            stroke={Colors.Gray300}
            fillOpacity={Colors.Gray300}
            fill="url(#balance-error)"
            strokeWidth="2px"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Column>
  );
};
