const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const DbQuery = require("../utils/dbQuery");

//creates a complete profile of the user that is stored in the database.
class User {
  static async _createPublicUser(user) {
    const goals = await DbQuery.goals(user.id);
    const quizzes = await DbQuery.quizzes(user.id);
    const userInfo = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      image_url: user.image_url,
      total_points: user.total_points,
      status: user.status,
      quiztaken: user.quiztaken
    };

    return {
      user: userInfo,
      goals: goals,
      quizzes: quizzes,
    };
  }

  // Takes in the user's email, first_name, last_name, and password, hashes said
  // password and inputs the user's information into the database.
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

  // Fetches the user's information in the database by the user's email,
  // and returns said information to the fron end.
  static async fetchUserByEmail(email) {
    const user = await DbQuery.fetchUser(email);
    return user;
  }

  //Takes in the users email and provides to validate the user's credentials,
  // if valid, the user's profile is sent back, if not, there is an error thrown.
  static async authenticate(creds) {
    const { email, password } = creds;

    const userInfo = await User.fetchUserByEmail(email);
    try {
      if (userInfo) {
        // compare hashed password to a new hash from password
        const isValid = await bcrypt.compare(password, userInfo.password);
        if (isValid === true) {
          const { user, goals, quizzes } = await User._createPublicUser(
            userInfo
          );
          return {
            user: user,
            goals: goals,
            quizzes: quizzes,
          };
        }
      }

      throw new UnauthorizedError("Invalid username/password");
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  //Inserts the goal a user inputs into the goal table in our database
  static async insertGoal(data) {
    const { id, goal, start_date, end_date, category, description } = data;

    const goals = await DbQuery.insertGoal(
      id,
      goal,
      start_date,
      end_date,
      category,
      description
    );

    return goals;
  }

  //Inserts the quiz a user inputs into the quiz table in our database
  static async insertQuiz(data) {
    const { id, topic, points } = data;

    const quiz = await DbQuery.insertQuiz(id, topic, points);

    return quiz;
  }

  //Updates the total points field in the users table in our database.
  //adds updateValue to the existing value in the table.
  static async updateTotalPoints(data) {
    const { updateValue, id } = data;

    const point = await DbQuery.updatePoints(updateValue, id);

    return point;
  }

  static async updateImageAndStatus(data) {
    const { id, image_url, status } = data;
    const imageStats = await DbQuery.updateImageAndStatus(
      id,
      image_url,
      status
    );

    return imageStats;
  }

  static async updateGoalStatus(data) {
    const { id } = data;
    const goalStat = await DbQuery.updateGoalStatus(
      id
    );

    return goalStat;
  }
}

module.exports = User;
