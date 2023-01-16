import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

const parseStringLenType = (value: unknown, minLength: number, maxLength: number) => {
  if (typeof value === 'string') {
    if (value.length <= maxLength && value.length >= minLength) {
      return value;
    }
    throw new Error(
      `parseCiFrom${minLength}To${maxLength}Type: String must not be less than ${minLength} and more than ${maxLength} characters. It is ${value.length} characters`,
    );
  } else {
    throw new Error(
      `parseCiFrom${minLength}To${maxLength}Type: value must be of type String. It is of type '${typeof value}'`,
    );
  }
};

const serializeStringLenType = (value: unknown, minLength: number, maxLength: number) => {
  if (typeof value === 'string') {
    if (value.length <= maxLength && value.length >= minLength) {
      return value;
    }
    throw new Error(
      `serializeCiFrom${minLength}To${maxLength}Type: String must not be less than ${minLength} and more than ${maxLength} characters. It is ${value.length} characters`,
    );
  } else {
    throw new Error(
      `serializeCiFrom${minLength}To${maxLength}Type: value must be of type String. It is of type '${typeof value}'`,
    );
  }
};

const parseLiteralStringLenType = (ast: ValueNode, minLength: number, maxLength: number) => {
  if (ast.kind === Kind.STRING) {
    return parseStringLenType(ast.value, minLength, maxLength);
  }

  throw new Error();
};

export const Length = (minLength: number, maxLength: number) =>
  new GraphQLScalarType({
    name: `StringLenFrom${minLength}To${maxLength}Type`,
    description: `String from ${minLength} to ${maxLength} Chars`,
    serialize: value => serializeStringLenType(value, minLength, maxLength),
    parseValue: value => parseStringLenType(value, minLength, maxLength),
    parseLiteral: ast => parseLiteralStringLenType(ast, minLength, maxLength),
  });
