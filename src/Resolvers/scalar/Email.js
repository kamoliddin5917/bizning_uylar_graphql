const { GraphQLScalarType, Kind } = require("graphql");

const isEmail = (value) => {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
    throw new Error(`This is not email (${value})`);
  return value;
};

module.exports = {
  Email: new GraphQLScalarType({
    name: "Email",
    description: "This is email ?",
    serialize: isEmail,
    parseValue: isEmail,
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return isEmail(ast.value);
      }
      throw new Error(`Invalid values (${ast.value})`);
    },
  }),
};
