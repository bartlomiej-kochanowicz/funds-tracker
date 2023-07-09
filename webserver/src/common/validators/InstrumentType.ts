import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Instrument } from '@app/common/constants/instrument';

@ValidatorConstraint({ name: 'InstrumentType', async: false })
export class CustomValidator implements ValidatorConstraintInterface {
  allowedValues = Object.values(Instrument);

  validate(value: keyof typeof Instrument) {
    return this.allowedValues.includes(value);
  }

  defaultMessage = (args: ValidationArguments) =>
    `${args.property} must be one of ${this.allowedValues.join(', ')}`;
}

export const IsInstrumentType =
  (validationOptions?: ValidationOptions) =>
  (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'IsInstrumentType',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CustomValidator,
    });
  };
