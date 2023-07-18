const db = require("../db");

class DbQuery {
  static async insertUsers(
    normalizedEmail,
    hashedPassword,
    username,
    first_name,
    last_name
  ) {
    const total_points = 0;
    const result = await db.query(
      `INSERT INTO users (
          email, 
          password, 
          username, 
          first_name, 
          last_name,
          total_points
          )
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING 
                id,            
                first_name, 
                last_name,
                username,
                email,
                total_points
      `,
      [
        normalizedEmail,
        hashedPassword,
        username,
        first_name,
        last_name,
        total_points,
      ]
    );
    return result.rows[0];
  }

  static async fetchUser(info) {
    const fetchUser = await db.query(
      `SELECT 
            id,
            email, 
            password,
            first_name,
            last_name,
            username,
            total_points,
            image_url
               FROM users
               WHERE email = $1
              `,
      [info]
    );
    return fetchUser.rows[0];
  }

  static async insertGoal(id, start_date, end_date, category, description) {
    const goal = await db.query(
      `INSERT INTO goals (
        user_id, 
        start_date, 
        end_date, 
        category, 
        description
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING             
                    start_date, 
                    end_date,
                    category, 
                    description

    `,
      [id, start_date, end_date, category, description]
    );
    return goal.rows[0];
  }

  static async insertQuiz(id, topic, points) {
    const quiz = await db.query(
      `INSERT INTO quiz (
        user_id, 
        topic, 
        points
        )
        VALUES ($1, $2, $3)
        RETURNING             
            topic,
            points

    `,
      [id, topic, points]
    );
    return quiz.rows[0];
  }

  static async goals(id) {
    const goals = await db.query(
      `SELECT 
      start_date, 
      end_date,
      category, 
      description
            FROM goals
            WHERE user_id = $1
            ORDER BY created_at DESC`,
      [id]
    );
    return goals.rows;
  }

  static async quizzes(id) {
    const quizzes = await db.query(
      `SELECT 
      topic, 
      points
            FROM quiz
            WHERE user_id = $1
            ORDER BY created_at DESC`,
      [id]
    );
    return quizzes.rows;
  }

  static async updatePoints(updateValue, id) {
    const points = await db.query(
      `UPDATE users
      SET total_points = total_points + $1
      WHERE id = $2
      RETURNING total_points`,
      [updateValue, id]
    );
    return points.rows[0];
  }
}

module.exports = DbQuery;
