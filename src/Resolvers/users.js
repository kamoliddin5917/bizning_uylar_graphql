const model = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { sign, verify } = require("../utils/jwt");
const { singleFileUpload, deleteFile } = require("../middlewares/file");

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
    createUser: async (_, { firstname, lastname, email, password }) => {
      try {
        const hashedPassword = await hashPassword(password);

        if (!hashedPassword) throw new Error("SERVER_ERROR!");

        const createUser = await model.createUser(
          firstname,
          lastname,
          email,
          hashedPassword
        );

        if (!createUser) throw new Error("BAD_REQUEST!");

        const token = sign({ userId: createUser.user_id });

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
      { firstname, lastname, image },
      { ctx, userAuth }
    ) => {
      try {
        if (!firstname && !lastname && !image) throw new Error("BAD_REQUEST!");

        const userId = userAuth(ctx);

        const findUser = await model.findUser(userId);
        if (!findUser) throw new Error("SERVER_ERROR_FIND!");

        if (image) {
          const imageName = await singleFileUpload(image);

          const updateUser = await model.updateUserImage(
            firstname || findUser.user_firstname,
            lastname || findUser.user_lastname,
            imageName,
            userId
          );
          if (!updateUser) throw new Error("SERVER_ERROR_UPDATE!");

          deleteFile(findUser.user_image);

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
        if (!updateUser) throw new Error("SERVER_ERROR_UPDATE!");

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

        if (!deleteUser) throw new Error("SERVER_ERROR_DELETE!");

        deleteFile(deleteUser.user_image);

        return {
          status: 200,
          message: "DELETE_USER",
          data: { user: deleteUser },
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { admin, email, password, username, login }) => {
      try {
        if (admin === "admin") {
          if (!email || !password) throw new Error("BAD_REQUEST!");

          const findUsers = await model.findUserLogin(email);

          if (!findUsers) throw new Error("SERVER_ERROR!");

          const comparedPassword = await comparePassword(
            password,
            findUsers.user_password
          );

          if (!comparedPassword) throw new Error("BAD_REQUEST!");

          const token = sign({ userId: findUsers.user_id });

          return {
            status: 200,
            message: "OK",
            data: { token },
          };
        } else if (admin === "super admin") {
          if (!username || !login || !password) throw new Error("BAD_REQUEST!");

          const findAdmin = await model.findAdminLogin(username);

          if (!findAdmin) throw new Error("SERVER_ERROR!");

          const comparedPassword = await comparePassword(
            password,
            findAdmin.admin_password
          );
          const comparedLogin = await comparePassword(
            login,
            findAdmin.admin_login
          );

          if (!comparedPassword || !comparedLogin)
            throw new Error("BAD_REQUEST!");

          const token = sign({ adminId: findAdmin.admin_id });

          return {
            status: 200,
            message: "OK",
            data: { token },
          };
        } else {
          throw new Error("BAD_REQUEST!");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
