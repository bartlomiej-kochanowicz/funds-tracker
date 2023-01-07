import { FC, lazy } from 'react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Colors } from 'styles/theme';
import { CashAccountHistory } from '__generated__/graphql';
import { EmptyView } from './Chart.styles';

const EmptyChartSvg = lazy(() =>
  import('assets/svgs/empty-chart.svg').then(({ ReactComponent: component }) => ({
    default: component,
  })),
);

interface ChartProps {
  data: Omit<CashAccountHistory, 'uuid'>[];
}

export const Chart: FC<ChartProps> = ({ data }) => {
  const id = 'balance';

  if (!data.length) {
    return (
      <EmptyView>
        <EmptyChartSvg />
      </EmptyView>
    );
  }

  return (
    <ResponsiveContainer
      width="100%"
      height={150}
    >
      <AreaChart data={data}>
        <defs>
          <linearGradient
            id={id}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor={Colors.Blue}
              stopOpacity={0.6}
            />

            <stop
              offset="95%"
              stopColor={Colors.Blue}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey={id}
          stroke={Colors.Blue}
          fillOpacity={Colors.Blue}
          fill={`url(#${id})`}
          strokeWidth="2px"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
