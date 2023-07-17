const db = require("../db");

class DbQuery{
  static async insertUsers(
    normalizedEmail,
    hashedPassword,
    username,
    first_name,
    last_name
  ) {
    const result = await db.query(
      `INSERT INTO users (
          email, 
          password, 
          username, 
          first_name, 
          last_name,
          total_points
          )
          VALUES ($1, $2, $3, $4, $5)
          RETURNING             
                first_name, 
                last_name,
                username,
                email,
                total_points
      `,
      [normalizedEmail, hashedPassword, username, first_name, last_name, 0]
    );
    return result.rows[0];
  }

  static async fetchUser(info) {
    const fetchUser = await db.query(
      `SELECT id,
                  email, 
                  password,
                  first_name,
                  last_name,
                  username
               FROM users
               WHERE email = $1
              `,
      [info]
    );
    return fetchUser.rows[0];
  }
}

module.exports = DbQuery;
