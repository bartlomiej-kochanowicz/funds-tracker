import { object, string, boolean, number, mixed } from 'yup';

export const validationSchema = object().shape({
  instrumentName: string().required('add.instrument.name.required'),
  instrumentType: string().nullable().required('add.instrument.type.required'),
  instrumentRebalancing: boolean(),
  instrumentPercentage: mixed()
    .notRequired()
    .when('instrumentRebalancing', {
      is: (field: boolean) => field,
      then: number()
        .typeError('add.instrument.percentage.required')
        .min(1, 'add.instrument.percentage.error.range.min')
        .max(100, 'add.instrument.percentage.error.range.max')
        .required('add.instrument.percentage.required'),
    }),
});
