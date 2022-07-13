import { object, string, boolean, number, mixed } from 'yup';

export const validationSchema = object().shape({
  instrumentName: string().required('add.instrument.name.required'),
  instrumentType: string().nullable().required('add.instrument.type.required'),
  instrumentRebalancing: boolean(),
  instrumentPercentage: mixed()
    .typeError('aosidjoaisjdoiajsd')
    .notRequired()
    .when('instrumentRebalancing', {
      is: (field: boolean) => field,
      then: number()
        .typeError('add.instrument.percentage.required')
        .min(1, 'za malo')
        .max(100, 'za duzo')
        .required('add.instrument.percentage.required'),
    }),
});
