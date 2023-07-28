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
                total_points,
                status, 
                image_url
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
            image_url,
            status
               FROM users
               WHERE email = $1
              `,
      [info]
    );
    return fetchUser.rows[0];
  }

  static async insertGoal(id, goal, start_date, end_date, category, description) {
    const goals = await db.query(
      `INSERT INTO goals (
        goal,
        user_id, 
        start_date, 
        end_date, 
        category, 
        description
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING   
                    goal,   
                    start_date, 
                    end_date,
                    category, 
                    description

    `,
      [goal, id, start_date, end_date, category, description]
    );
    return goals.rows[0];
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
      goal,
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

  static async updateImageAndStatus(id, image_url, status) {
    const imageStats = await db.query(
      `UPDATE users
      SET image_url = $1, status = $2
      WHERE id = $3
      RETURNING 
      image_url,
      status
      `,
      [image_url, status, id]
    );
    return imageStats.rows[0];
  }
}

module.exports = DbQuery;
