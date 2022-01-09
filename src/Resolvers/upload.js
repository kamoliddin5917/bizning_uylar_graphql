const { singleFileUpload, multipleFileUpload } = require("../middlewares/file");

module.exports = {
  Mutation: {
    singleUpload: async (_, { file }) => {
      const imageUrl = await singleFileUpload(file);
      console.log(imageUrl);

      return {
        message: "Single File Upload!",
      };
    },
    multipleUpload: async (_, { file }) => {
      const imagesUrl = await multipleFileUpload(file);

      console.log(imagesUrl);

      return {
        message: "Single File Upload!",
      };
    },
  },
};
