const model = require("../models/company");
const { multipleFileUpload, deleteFile } = require("../middlewares/file");
const pubSub = require("../PubSub/PubSub");

module.exports = {
  Query: {
    getCompanies: async () => {
      const companies = await model.companies();

      return companies;
    },
  },
  Company: {
    id: ({ company_id }) => company_id,
    name: ({ company_name }) => company_name,
    media: ({ company_media }) => company_media,
    inform: ({ company_inform }) => company_inform,
    date: ({ company_date }) =>
      `${new Date(company_date).getHours()}:${new Date(
        company_date
      ).getMinutes()}:${new Date(company_date).getSeconds()} ${new Date(
        company_date
      ).getDate()}.${new Date(company_date).getUTCMonth() + 1}.${new Date(
        company_date
      ).getFullYear()}`,
    complexes: async ({ company_id }) => await model.complexes(company_id),
  },
  Mutation: {
    createCompany: async (_, { name, media, inform }, { ctx, userAuth }) => {
      try {
        const userId = userAuth(ctx);
        const medias = await multipleFileUpload(media);

        const createCompany = await model.createCompany(
          name,
          medias,
          inform,
          userId
        );

        if (!createCompany)
          return { status: 500, message: "SERVER_ERROR_CREATED!" };

        pubSub.publish("COMPANY_CREATED", {
          companyCreated: createCompany,
        });

        return {
          status: 201,
          message: "COMPANY_CREATED!",
          company: createCompany,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateCompany: async (
      _,
      { id, name, media, inform },
      { ctx, userAuth }
    ) => {
      try {
        userAuth(ctx);

        if (!name && !media && !inform)
          return { status: 400, message: "BAD_REQUEST!" };

        const findCompany = await model.findCompany(id);

        if (!findCompany) return { status: 500, message: "SERVER_ERROR_FIND!" };

        if (media) {
          const medias = await multipleFileUpload(media);

          const updateCompanyMedia = await model.updateCompanyMedia(
            name || findCompany.company_name,
            inform || findCompany.company_inform,
            medias,
            id
          );

          if (!updateCompanyMedia)
            return { status: 500, message: "SERVER_ERROR_UPDATED!" };

          deleteFile(findCompany.company_media);

          pubSub.publish("COMPANY_UPDATED", {
            companyUpdated: updateCompanyMedia,
          });

          return {
            status: 200,
            message: "COMPANY_UPDATED",
            company: updateCompanyMedia,
          };
        }

        const updateCompany = await model.updateCompany(
          name || findCompany.company_name,
          inform || findCompany.company_inform,
          id
        );

        if (!updateCompany)
          return { status: 500, message: "SERVER_ERROR_UPDATED!" };

        pubSub.publish("COMPANY_UPDATED", {
          companyUpdated: updateCompany,
        });

        return {
          status: 200,
          message: "COMPANY_UPDATED!",
          company: updateCompany,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteCompany: async (_, { id }, { ctx, userAuth }) => {
      try {
        userAuth(ctx);

        const deleteCompany = await model.deleteCompany(id);

        if (!deleteCompany)
          return { status: 500, message: "SERVER_ERROR_DELETED!" };

        deleteFile(deleteCompany.company_media);

        pubSub.publish("COMPANY_DELETED", {
          companyDeleted: deleteCompany,
        });

        return {
          status: 200,
          message: "COMPANY_DELETED!",
          company: deleteCompany,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Subscription: {
    companyCreated: {
      subscribe: () => pubSub.asyncIterator("COMPANY_CREATED"),
    },
    companyUpdated: {
      subscribe: () => pubSub.asyncIterator("COMPANY_UPDATED"),
    },
    companyDeleted: {
      subscribe: () => pubSub.asyncIterator("COMPANY_DELETED"),
    },
  },
};
