const model = require("../models/bank");
const { multipleFileUpload, deleteFile } = require("../middlewares/file");
const pubSub = require("../PubSub/PubSub");

module.exports = {
  Query: {
    getBanks: async () => {
      const banks = await model.banks();

      return banks;
    },
  },
  Bank: {
    id: ({ bank_id }) => bank_id,
    name: ({ bank_name }) => bank_name,
    email: ({ bank_email }) => bank_email,
    kriditSum: ({ bank_kridit_sum }) => `${bank_kridit_sum} sum`,
    kriditTime: ({ bank_kridit_time }) => `${bank_kridit_time} yil`,
    media: ({ bank_media }) => bank_media,
    inform: ({ bank_inform }) => bank_inform,
    date: ({ bank_date }) =>
      `${new Date(bank_date).getHours()}:${new Date(
        bank_date
      ).getMinutes()}:${new Date(bank_date).getSeconds()} ${new Date(
        bank_date
      ).getDate()}.${new Date(bank_date).getUTCMonth() + 1}.${new Date(
        bank_date
      ).getFullYear()}`,
  },
  Mutation: {
    createBank: async (
      _,
      { name, email, kriditSum, kriditTime, media, inform },
      { ctx, adminAuth }
    ) => {
      try {
        adminAuth(ctx);

        const medias = await multipleFileUpload(media);

        const createBank = await model.createBank(
          name,
          kriditSum,
          kriditTime,
          email,
          inform,
          medias
        );

        if (!createBank) throw new Error("SERVER_ERROR_CREATED!");

        pubSub.publish("BANK_CREATED", {
          bankCreated: createBank,
        });

        return {
          status: 201,
          message: "BANK_CREATED!",
          bank: createBank,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateBank: async (
      _,
      { id, name, email, kriditSum, kriditTime, media, inform },
      { ctx, adminAuth }
    ) => {
      try {
        adminAuth(ctx);

        if (!name && !email && !kriditSum && !kriditTime && !media && !inform)
          throw new Error("BAD_REQUEST!");

        const findBank = await model.findBank(id);

        if (!findBank) throw new Error("SERVER_ERROR_FIND!");

        if (media) {
          const medias = await multipleFileUpload(media);

          const updateBankMedia = await model.updateBankMedia(
            name || findBank.bank_name,
            kriditSum || findBank.bank_kridit_sum,
            kriditTime || findBank.bank_kridit_time,
            email || findBank.bank_email,
            inform || findBank.bank_inform,
            medias,
            id
          );

          if (!updateBankMedia) throw new Error("SERVER_ERROR_UPDATED!");

          deleteFile(findBank.bank_media);

          pubSub.publish("BANK_UPDATED", {
            bankUpdated: updateBankMedia,
          });

          return {
            status: 200,
            message: "BANK_UPDATED",
            bank: updateBankMedia,
          };
        }

        const updateBank = await model.updateBank(
          name || findBank.bank_name,
          kriditSum || findBank.bank_kridit_sum,
          kriditTime || findBank.bank_kridit_time,
          email || findBank.bank_email,
          inform || findBank.bank_inform,
          id
        );

        if (!updateBank) throw new Error("SERVER_ERROR_UPDATED!");

        pubSub.publish("BANK_UPDATED", {
          bankUpdated: updateBank,
        });

        return {
          status: 200,
          message: "BANK_UPDATED!",
          bank: updateBank,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteBank: async (_, { id }, { ctx, adminAuth }) => {
      try {
        adminAuth(ctx);

        const deleteBank = await model.deleteBank(id);

        if (!deleteBank) throw new Error("SERVER_ERROR_DELETED!");

        deleteFile(deleteBank.bank_media);

        pubSub.publish("BANK_DELETED", {
          bankDeleted: deleteBank,
        });

        return {
          status: 200,
          message: "BANK_DELETED!",
          bank: deleteBank,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Subscription: {
    bankCreated: {
      subscribe: () => pubSub.asyncIterator("BANK_CREATED"),
    },
    bankUpdated: {
      subscribe: () => pubSub.asyncIterator("BANK_UPDATED"),
    },
    bankDeleted: {
      subscribe: () => pubSub.asyncIterator("BANK_DELETED"),
    },
  },
};
