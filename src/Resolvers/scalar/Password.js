const { GraphQLScalarType, Kind } = require("graphql");

const isPassword = (value) => {
  if (
    !value.match(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{7,17}$/
    )
  )
    throw new Error(
      "Kamida 7 ta belgi, ko'pi bn 17 ta belgi, kotta-kichkina harf, belgi, son bo'lishi kerak!"
    );
  return value;
};

module.exports = {
  Password: new GraphQLScalarType({
    name: "Password",
    description: "This is Password ?",
    serialize: isPassword,
    parseValue: isPassword,
    parseLiteral: (ast) => {
      if (ast.kind === Kind.STRING) {
        return isPassword(ast.value);
      }
      throw new Error(`Invalid values (${ast.value})`);
    },
  }),
};
