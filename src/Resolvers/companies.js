const model = require("../models/company");
const { multipleFileUpload, deleteFile } = require("../middlewares/file");

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

        if (!createCompany) throw new Error("SERVER_ERROR_CREATED!");

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

        if (!name && !media && !inform) throw new Error("BAD_REQUEST!");

        const findCompany = await model.findCompany(id);

        if (!findCompany) throw new Error("SERVER_ERROR_FIND!");

        if (media) {
          const medias = await multipleFileUpload(media);

          const updateCompanyMedia = await model.updateCompanyMedia(
            name || findCompany.company_name,
            inform || findCompany.company_inform,
            medias,
            id
          );

          if (!updateCompanyMedia) throw new Error("SERVER_ERROR_UPDATED!");

          deleteFile(findCompany.company_media);

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

        if (!updateCompany) throw new Error("SERVER_ERROR_UPDATED!");

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

        if (!deleteCompany) throw new Error("SERVER_ERROR_DELETED!");

        deleteFile(deleteCompany.company_media);

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
};
