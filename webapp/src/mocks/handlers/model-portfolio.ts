import { rest } from 'msw';
import { API_URL_MOCK } from 'config/env';

type Instrument = {
  uuid: string;
  name: string;
  type: string;
  percentage: number;
  rebalancing: boolean;
};

interface InstrumentsResponse {
  collection: Instrument[];
}

export default [
  rest.get<InstrumentsResponse>(`${API_URL_MOCK}/model-portfolio`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        collection: [
          {
            uuid: '44c093f8-0b0a-4634-8b52-ffa9397a31f6',
            name: 'Złoto',
            type: 'commodies',
            percentage: 15,
            rebalancing: true,
          },
          {
            uuid: '88cd8b02-6c37-4a32-a9b8-96a9410ff81e',
            name: 'Konto oszczędnościowe',
            type: 'saving-accounts',
            percentage: 25,
            rebalancing: true,
          },
          {
            uuid: '6326205c-7de5-49b7-bd16-eca87c9627b1',
            name: 'Konto mBank',
            type: 'cash',
            percentage: null,
            rebalancing: false,
          },
          {
            uuid: '83814fc9-90a7-49ab-a885-1b141ab2c5a0',
            name: 'ETF - rynki rozwinięte',
            type: 'stocks',
            percentage: 20,
            rebalancing: true,
          },
          {
            uuid: 'fdf53bdf-295d-4855-be0d-026f24d24e1d',
            name: 'ETF - rynki wschodzące',
            type: 'stocks',
            percentage: 20,
            rebalancing: true,
          },
          {
            uuid: 'afa0c994-29a6-4066-b229-8451da79768e',
            name: 'Btc',
            type: 'crypto',
            percentage: 10,
            rebalancing: true,
          },
          {
            uuid: '3accde2b-0097-4c2f-8ba8-5cec82b46614',
            name: 'Eth',
            type: 'crypto',
            percentage: 10,
            rebalancing: true,
          },
        ],
      }),
    ),
  ),
];
