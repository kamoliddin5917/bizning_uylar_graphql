const model = require("../models/house");
const { multipleFileUpload, deleteFile } = require("../middlewares/file");
const pubSub = require("../PubSub/PubSub");

module.exports = {
  Query: {
    getHouses: async () => {
      const houses = await model.houses();

      return houses;
    },
  },
  House: {
    id: ({ house_id }) => house_id,
    floor: ({ house_floor }) => house_floor,
    room: ({ house_room }) => house_room,
    kvm: ({ house_kvm }) => house_kvm,
    kvmSum: ({ house_kvm_sum }) => house_kvm_sum,
    totalSum: ({ house_kvm, house_kvm_sum }) =>
      `${house_kvm * house_kvm_sum} sum`,
    media: ({ house_media }) => house_media,
    inform: ({ house_inform }) => house_inform,
    date: ({ house_date }) =>
      `${new Date(house_date).getHours()}:${new Date(
        house_date
      ).getMinutes()}:${new Date(house_date).getSeconds()} ${new Date(
        house_date
      ).getDate()}.${new Date(house_date).getUTCMonth() + 1}.${new Date(
        house_date
      ).getFullYear()}`,
    banks: async ({ house_kvm, house_kvm_sum }) =>
      await model.banks(house_kvm * house_kvm_sum),
  },
  Mutation: {
    createHouse: async (
      _,
      { complexId, floor, room, kvm, kvmSum, media, inform },
      { ctx, userAuth }
    ) => {
      try {
        userAuth(ctx);

        const medias = await multipleFileUpload(media);

        const createHouse = await model.createHouse(
          floor,
          room,
          kvm,
          kvmSum,
          medias,
          inform,
          complexId
        );

        if (!createHouse)
          return { status: 500, message: "SERVER_ERROR_CREATED!" };

        pubSub.publish("HOUSE_CREATED", {
          houseCreated: createHouse,
        });

        return {
          status: 201,
          message: "HOUSE_CREATED!",
          house: createHouse,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateHouse: async (
      _,
      { id, floor, room, kvm, kvmSum, media, inform },
      { ctx, userAuth }
    ) => {
      try {
        userAuth(ctx);

        if (!floor && !room && !kvm && !kvmSum && !media && !inform)
          return { status: 400, message: "BAD_REQUEST!" };

        const findHouse = await model.findHouse(id);

        if (!findHouse) return { status: 500, message: "SERVER_ERROR_FIND!" };

        if (media) {
          const medias = await multipleFileUpload(media);

          const updateHouseMedia = await model.updateHouseMedia(
            floor || findHouse.house_floor,
            room || findHouse.house_room,
            kvm || findHouse.house_kvm,
            kvmSum || findHouse.house_kvm_sum,
            inform || findHouse.house_inform,
            medias,
            id
          );

          if (!updateHouseMedia)
            return { status: 500, message: "SERVER_ERROR_UPDATED!" };

          deleteFile(findHouse.house_media);

          pubSub.publish("HOUSE_UPDATED", {
            houseUpdated: updateHouseMedia,
          });

          return {
            status: 200,
            message: "HOUSE_UPDATED",
            house: updateHouseMedia,
          };
        }

        const updateHouse = await model.updateHouse(
          floor || findHouse.house_floor,
          room || findHouse.house_room,
          kvm || findHouse.house_kvm,
          kvmSum || findHouse.house_kvm_sum,
          inform || findHouse.house_inform,
          id
        );

        if (!updateHouse)
          return { status: 500, message: "SERVER_ERROR_UPDATED!" };

        pubSub.publish("HOUSE_UPDATED", {
          houseUpdated: updateHouse,
        });

        return {
          status: 200,
          message: "HOUSE_UPDATED!",
          house: updateHouse,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteHouse: async (_, { id }, { ctx, userAuth }) => {
      try {
        userAuth(ctx);

        const deleteHouse = await model.deleteHouse(id);

        if (!deleteHouse)
          return { status: 500, message: "SERVER_ERROR_DELETED!" };

        deleteFile(deleteHouse.house_media);

        pubSub.publish("HOUSE_DELETED", {
          houseDeleted: deleteHouse,
        });

        return {
          status: 200,
          message: "HOUSE_DELETED!",
          house: deleteHouse,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Subscription: {
    houseCreated: {
      subscribe: () => pubSub.asyncIterator("HOUSE_CREATED"),
    },
    houseUpdated: {
      subscribe: () => pubSub.asyncIterator("HOUSE_UPDATED"),
    },
    houseDeleted: {
      subscribe: () => pubSub.asyncIterator("HOUSE_DELETED"),
    },
  },
};
