const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const DbQuery = require("../utils/dbQuery");

class User {
  static async _createPublicUser(user) {

    const goals = await DbQuery.goals(user.id);


    const userInfo = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      image_url: user.image_url,
      total_points: user.total_points
    };

    return {
      user: userInfo,
      goals: goals
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

  static async authenticate(creds) {
    const { email, password } = creds;

    const userInfo = await User.fetchUserByEmail(email);

    try {
      if (userInfo) {
        // compare hashed password to a new hash from password
        const isValid = await bcrypt.compare(password, userInfo.password);
        if (isValid === true) {
          const { user, goals} =
            await User._createPublicUser(userInfo);
          return {
            user: user,
            goals: goals
          };
        }
      }s

      throw new UnauthorizedError("Invalid username/password");
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async insertGoal(data) {
    const { id, start_date, end_date, category, description } = data;

    const goal = await DbQuery.insertGoal(id, start_date, end_date, category, description)
    
    return goal;
  }
}

module.exports = User;