const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const DbQuery = require("../utils/dbQuery");

class User {
  static async _createPublicUser(user) {

    const userInfo = {
      id: user.id,
      first_name: user.first_name,
      username: user.username,
      email: user.email,
    };

    return {
      user: userInfo,
      exercise: exercise,
      sleep: sleep,
      nutrition: nutrition
    };
  }

  static async register(creds) {
    const { email, username, first_name, last_name, password } = creds;

    const existingUserWithEmail = await User.fetchUserByEmail(email);
    try {
      if (existingUserWithEmail) {
        throw new BadRequestError(`Duplicate email: ${email}`);
      }
    } catch (error) {
      console.error(error);
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const normalizedEmail = email.toLowerCase();
    const user = DbQuery.insertUsers(
      normalizedEmail,
      hashedPassword,
      username,
      first_name,
      last_name
    );

    return user;
  }

  static async fetchUserByEmail(email) {
    const user = await DbQuery.fetchUser(email);
    return user;
  }
}

module.exports = User;