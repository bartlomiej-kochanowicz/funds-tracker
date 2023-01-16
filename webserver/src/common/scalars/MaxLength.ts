import { GraphQLScalarType, Kind } from 'graphql';

const parseStringMaxLenType = (value, maxLength) => {
  if (typeof value === 'string') {
    if (value.length <= maxLength) {
      return value;
    }
    throw new Error(
      `parseCi${maxLength}Type: String must not be more that ${maxLength} characters. It is ${value.length} characters`,
    );
  } else {
    throw new Error(
      `parseCi${maxLength}Type: value must be of type String. It is of type '${typeof value}'`,
    );
  }
};

const serializeStringMaxLenType = (value, maxLength) => {
  if (typeof value === 'string') {
    if (value.length <= maxLength) {
      return value;
    }
    throw new Error(
      `serializeCi${maxLength}Type: String must not be more that ${maxLength} characters. It is ${value.length} characters`,
    );
  } else {
    throw new Error(
      `serializeCi${maxLength}Type: value must be of type String. It is of type '${typeof value}'`,
    );
  }
};

const parseLiteralStringMaxLenType = (ast, maxLength) => {
  if (ast.kind === Kind.STRING) {
    return parseStringMaxLenType(ast.value, maxLength);
  }

  throw new Error();
};

export const MaxLength = (maxLength: number) =>
  new GraphQLScalarType({
    name: `StringMaxLen${maxLength}Type`,
    description: `String up to ${maxLength} Chars`,
    serialize: value => serializeStringMaxLenType(value, maxLength),
    parseValue: value => parseStringMaxLenType(value, maxLength),
    parseLiteral: ast => parseLiteralStringMaxLenType(ast, maxLength),
  });
