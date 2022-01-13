const model = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { sign, verify } = require("../utils/jwt");
const { singleFileUpload, deleteFile } = require("../middlewares/file");
const pubSub = require("../PubSub/PubSub");

module.exports = {
  Query: {
    getUsers: async () => {
      const users = await model.users();
      return users;
    },
  },
  User: {
    id: ({ user_id }) => user_id,
    firstname: ({ user_firstname }) => user_firstname,
    lastname: ({ user_lastname }) => user_lastname,
    email: ({ user_email }) => user_email,
    image: ({ user_image }) => user_image,
    date: ({ user_date }) =>
      `${new Date(user_date).getHours()}:${new Date(
        user_date
      ).getMinutes()}:${new Date(user_date).getSeconds()} ${new Date(
        user_date
      ).getDate()}.${new Date(user_date).getUTCMonth() + 1}.${new Date(
        user_date
      ).getFullYear()}`,
    companies: async ({ user_id }) => await model.companies(user_id),
  },
  Mutation: {
    createUser: async (
      _,
      { newUser: { firstname, lastname, email, password } }
    ) => {
      try {
        const hashedPassword = await hashPassword(password);

        if (!hashedPassword) return { status: 500, message: "SERVER_ERROR!" };

        const createUser = await model.createUser(
          firstname,
          lastname,
          email,
          hashedPassword
        );

        if (!createUser) return { status: 400, message: "BAD_REQUEST!" };

        const token = sign({ userId: createUser.user_id });

        pubSub.publish("USER_CREATED", {
          uuserCreated: createUser,
        });

        return {
          status: 201,
          message: "CREATE_USER",
          data: { token, user: createUser },
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateUser: async (
      _,
      { updateUser: { firstname, lastname, image } },
      { ctx, userAuth }
    ) => {
      try {
        if (!firstname && !lastname && !image)
          return { status: 400, message: "BAD_REQUEST!" };

        const userId = userAuth(ctx);

        const findUser = await model.findUser(userId);

        if (!findUser) return { status: 500, message: "SERVER_ERROR_FIND!" };

        if (image) {
          const imageName = await singleFileUpload(image);

          const updateUser = await model.updateUserImage(
            firstname || findUser.user_firstname,
            lastname || findUser.user_lastname,
            imageName,
            userId
          );
          if (!updateUser)
            return { status: 500, message: "SERVER_ERROR_UPDATE!" };

          deleteFile(findUser.user_image);

          pubSub.publish("USER_UPDATED", {
            uuserUpdated: updateUser,
          });

          return {
            status: 200,
            message: "UPDATE_USER",
            data: { user: updateUser },
          };
        }

        const updateUser = await model.updateUser(
          firstname || findUser.user_firstname,
          lastname || findUser.user_lastname,
          userId
        );
        if (!updateUser)
          return { status: 500, message: "SERVER_ERROR_UPDATE!" };

        pubSub.publish("USER_UPDATED", {
          uuserUpdated: updateUser,
        });

        return {
          status: 200,
          message: "UPDATE_USER",
          data: { user: updateUser },
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteUser: async (_, a, { ctx, userAuth }) => {
      try {
        const userId = userAuth(ctx);

        const deleteUser = await model.deleteUser(userId);

        if (!deleteUser)
          return { status: 500, message: "SERVER_ERROR_DELETE!" };

        deleteFile(deleteUser.user_image);

        pubSub.publish("USER_DELETED", {
          uuserDeleted: deleteUser,
        });

        return {
          status: 200,
          message: "DELETE_USER",
          data: { user: deleteUser },
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (
      _,
      { loginUser: { admin, email, password, username, login } }
    ) => {
      try {
        if (admin === "admin") {
          if (!email || !password)
            return { status: 400, message: "BAD_REQUEST!" };

          const findUsers = await model.findUserLogin(email);

          if (!findUsers) return { status: 500, message: "SERVER_ERROR!" };

          const comparedPassword = await comparePassword(
            password,
            findUsers.user_password
          );

          if (!comparedPassword)
            return { status: 400, message: "BAD_REQUEST!" };

          const token = sign({ userId: findUsers.user_id });

          return {
            status: 200,
            message: "OK",
            data: { token },
          };
        } else if (admin === "super admin") {
          if (!username || !login || !password)
            return { status: 400, message: "BAD_REQUEST!" };

          const findAdmin = await model.findAdminLogin(username);

          if (!findAdmin) return { status: 500, message: "SERVER_ERROR!" };

          const comparedPassword = await comparePassword(
            password,
            findAdmin.admin_password
          );
          const comparedLogin = await comparePassword(
            login,
            findAdmin.admin_login
          );

          if (!comparedPassword || !comparedLogin)
            return { status: 400, message: "BAD_REQUEST!" };

          const token = sign({ adminId: findAdmin.admin_id });

          return {
            status: 200,
            message: "OK",
            data: { token },
          };
        } else {
          return { status: 400, message: "BAD_REQUEST!" };
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Subscription: {
    uuserCreated: {
      subscribe: () => pubSub.asyncIterator("USER_CREATED"),
    },
    uuserUpdated: {
      subscribe: () => pubSub.asyncIterator("USER_UPDATED"),
    },
    uuserDeleted: {
      subscribe: () => pubSub.asyncIterator("USER_DELETED"),
    },
  },
};
