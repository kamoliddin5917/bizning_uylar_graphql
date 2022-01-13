module.exports = {
  ResultUnion: {
    __resolveType(obj) {
      if (obj.status === 500 || obj.status === 400) {
        return "Error";
      } else if (obj.data) {
        return "Result";
      } else if (obj.company) {
        return "ResultCompany";
      } else if (obj.complex) {
        return "ResultComplex";
      } else if (obj.house) {
        return "ResultHouse";
      } else if (obj.bank) {
        return "ResultBank";
      }
    },
  },
};
