CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(255) NOT NULL,
  password      VARCHAR(255) NOT NULL,
  first_name    VARCHAR(255) NOT NULL,
  last_name     VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
  image_url     VARCHAR(255) CHECK (image_url IS NULL OR TRIM(image_url) = '' OR image_url LIKE 'https://%'),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status        VARCHAR(20) CHECK (status IN (NULL, 'Beginner', 'Intermediate')),
  total_points  INTEGER NOT NULL
);

CREATE TABLE goals (
  id                SERIAL PRIMARY KEY,
  goal              VARCHAR(255) NOT NULL,
  category          VARCHAR(255) NOT NULL,
  description       VARCHAR(255) NOT NULL,
  start_date        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status            VARCHAR(20) DEFAULT 'In progress' CHECK (status IN ('In progress', 'Accomplished')),
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id           INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE quiz (
  id                SERIAL PRIMARY KEY,
  topic             VARCHAR(255) NOT NULL,
  points            INTEGER NOT NULL,
  user_id           INTEGER NOT NULL,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);