const model = require("../models/complex");
const { multipleFileUpload, deleteFile } = require("../middlewares/file");

module.exports = {
  Query: {
    getComplexes: async () => {
      const complexes = await model.complexes();

      return complexes;
    },
  },
  Complex: {
    id: ({ complex_id }) => complex_id,
    name: ({ complex_name }) => complex_name,
    media: ({ complex_media }) => complex_media,
    inform: ({ complex_inform }) => complex_inform,
    date: ({ complex_date }) =>
      `${new Date(complex_date).getHours()}:${new Date(
        complex_date
      ).getMinutes()}:${new Date(complex_date).getSeconds()} ${new Date(
        complex_date
      ).getDate()}.${new Date(complex_date).getUTCMonth() + 1}.${new Date(
        complex_date
      ).getFullYear()}`,
    houses: async ({ complex_id }) => await model.houses(complex_id),
  },
  Mutation: {
    createComplex: async (
      _,
      { companyId, name, media, inform },
      { ctx, userAuth }
    ) => {
      try {
        userAuth(ctx);

        const medias = await multipleFileUpload(media);

        const createComplex = await model.createComplex(
          name,
          medias,
          inform,
          companyId
        );

        if (!createComplex) throw new Error("SERVER_ERROR_CREATED!");

        return {
          status: 201,
          message: "COMPLEX_CREATED!",
          complex: createComplex,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateComplex: async (
      _,
      { id, name, media, inform },
      { ctx, userAuth }
    ) => {
      try {
        userAuth(ctx);

        if (!name && !media && !inform) throw new Error("BAD_REQUEST!");

        const findComplex = await model.findComplex(id);

        if (!findComplex) throw new Error("SERVER_ERROR_FIND!");

        if (media) {
          const medias = await multipleFileUpload(media);

          const updateComplexMedia = await model.updateComplexMedia(
            name || findComplex.complex_name,
            inform || findComplex.complex_inform,
            medias,
            id
          );

          if (!updateComplexMedia) throw new Error("SERVER_ERROR_UPDATED!");

          deleteFile(findComplex.complex_media);

          return {
            status: 200,
            message: "COMPLEX_UPDATED",
            complex: updateComplexMedia,
          };
        }

        const updateComplex = await model.updateComplex(
          name || findComplex.complex_name,
          inform || findComplex.complex_inform,
          id
        );

        if (!updateComplex) throw new Error("SERVER_ERROR_UPDATED!");

        return {
          status: 200,
          message: "COMPLEX_UPDATED!",
          complex: updateComplex,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteComplex: async (_, { id }, { ctx, userAuth }) => {
      try {
        userAuth(ctx);

        const deleteComplex = await model.deleteComplex(id);

        if (!deleteComplex) throw new Error("SERVER_ERROR_DELETED!");

        deleteFile(deleteComplex.complex_media);

        return {
          status: 200,
          message: "COMPLEX_DELETED!",
          complex: deleteComplex,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
