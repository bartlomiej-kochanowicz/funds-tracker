import { GraphQLScalarType, Kind } from 'graphql';

const parseStringMinLenType = (value, minLength) => {
  if (typeof value === 'string') {
    if (value.length >= minLength) {
      return value;
    }
    throw new Error(
      `parseCi${minLength}Type: String must not be more that ${minLength} characters. It is ${value.length} characters`,
    );
  } else {
    throw new Error(
      `parseCi${minLength}Type: value must be of type String. It is of type '${typeof value}'`,
    );
  }
};

const serializeStringMinLenType = (value, minLength) => {
  if (typeof value === 'string') {
    if (value.length >= minLength) {
      return value;
    }
    throw new Error(
      `serializeCi${minLength}Type: String must not be more that ${minLength} characters. It is ${value.length} characters`,
    );
  } else {
    throw new Error(
      `serializeCi${minLength}Type: value must be of type String. It is of type '${typeof value}'`,
    );
  }
};

const parseLiteralStringMinLenType = (ast, minLength) => {
  if (ast.kind === Kind.STRING) {
    return parseStringMinLenType(ast.value, minLength);
  }
  throw new Error();
};

export const MinLength = (minLength: number) =>
  new GraphQLScalarType({
    name: `StringMinLen${minLength}Type`,
    description: `String up to ${minLength} Chars`,
    serialize: value => serializeStringMinLenType(value, minLength),
    parseValue: value => parseStringMinLenType(value, minLength),
    parseLiteral: ast => parseLiteralStringMinLenType(ast, minLength),
  });
