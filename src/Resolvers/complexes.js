const model = require("../models/complex");
const { multipleFileUpload, deleteFile } = require("../middlewares/file");
const pubSub = require("../PubSub/PubSub");

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

        if (!createComplex)
          return { status: 500, message: "SERVER_ERROR_CREATED!" };

        pubSub.publish("COMPLEX_CREATED", {
          complexCreated: createComplex,
        });

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

        if (!name && !media && !inform)
          return { status: 400, message: "BAD_REQUEST!" };

        const findComplex = await model.findComplex(id);

        if (!findComplex) return { status: 500, message: "SERVER_ERROR_FIND!" };

        if (media) {
          const medias = await multipleFileUpload(media);

          const updateComplexMedia = await model.updateComplexMedia(
            name || findComplex.complex_name,
            inform || findComplex.complex_inform,
            medias,
            id
          );

          if (!updateComplexMedia)
            return { status: 500, message: "SERVER_ERROR_UPDATED!" };

          deleteFile(findComplex.complex_media);

          pubSub.publish("COMPLEX_UPDATED", {
            complexUpdated: updateComplexMedia,
          });

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

        if (!updateComplex)
          return { status: 500, message: "SERVER_ERROR_UPDATED!" };

        pubSub.publish("COMPLEX_UPDATED", {
          complexUpdated: updateComplex,
        });

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

        if (!deleteComplex)
          return { status: 500, message: "SERVER_ERROR_DELETED!" };

        deleteFile(deleteComplex.complex_media);

        pubSub.publish("COMPLEX_DELETED", {
          complexDeleted: deleteComplex,
        });

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
  Subscription: {
    complexCreated: {
      subscribe: () => pubSub.asyncIterator("COMPLEX_CREATED"),
    },
    complexUpdated: {
      subscribe: () => pubSub.asyncIterator("COMPLEX_UPDATED"),
    },
    complexDeleted: {
      subscribe: () => pubSub.asyncIterator("COMPLEX_DELETED"),
    },
  },
};
