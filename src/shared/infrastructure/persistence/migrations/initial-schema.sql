
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(2) NOT NULL,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_categories_name(name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  image VARCHAR(200) NOT NULL,
  url VARCHAR(200) NOT NULL,
  width VARCHAR(10) NOT NULL,
  height VARCHAR(10) NOT NULL,
  category_id VARCHAR(2) NOT NULL,
  PRIMARY KEY(id),
  KEY IX_products_category_id(category_id),
  CONSTRAINT FK_products_category_id FOREIGN KEY(category_id) REFERENCES categories(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_users_email(email)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS clients(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  type ENUM ('B', 'T') NOT NULL DEFAULT 'B',
  created_at DATETIME NULL,
  created_by BIGINT UNSIGNED NULL,
  updated_at DATETIME NULL,
  updated_by BIGINT UNSIGNED NULL,
  first_name VARCHAR(75) NULL,
  last_name VARCHAR(75) NULL,
  dni VARCHAR(8) NULL,
  phone_number VARCHAR(9) NULL,
  PRIMARY KEY(id),
  UNIQUE INDEX UQ_clients_dni(dni),
  KEY IX_clients_created_by(created_by),
  KEY IX_clients_updated_by(updated_by),
  CONSTRAINT FK_clients_created_by FOREIGN KEY(created_by) REFERENCES users(id),
  CONSTRAINT FK_clients_updated_by FOREIGN KEY(updated_by) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

 CREATE TABLE IF NOT EXISTS orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  client_id BIGINT UNSIGNED NOT NULL,
  origin VARCHAR(45) NOT NULL,
  destination VARCHAR(45) NOT NULL,
  max_date DATETIME NULL,
  created_at DATETIME NULL,
  created_by BIGINT UNSIGNED NULL,
  updated_at DATETIME NULL,
  updated_by BIGINT UNSIGNED NULL,
  PRIMARY KEY(id),
  KEY IX_orders_client_id(client_id),
  KEY IX_orders_created_by(created_by),
  KEY IX_orders_updated_by(updated_by),
  CONSTRAINT FK_orders_client_id FOREIGN KEY(client_id) REFERENCES clients(id),
  CONSTRAINT FK_orders_created_by FOREIGN KEY(created_by) REFERENCES users(id),
  CONSTRAINT FK_orders_updated_by FOREIGN KEY(updated_by) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS accounts(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  balance DECIMAL(10,2) NULL,
  password VARCHAR(20) NULL,
  client_id BIGINT UNSIGNED NOT NULL,
  created_at DATETIME NULL,
  created_by BIGINT UNSIGNED NULL,
  updated_at DATETIME NULL,
  updated_by BIGINT UNSIGNED NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX UQ_clients_password(password),
  KEY IX_accounts_client_id(client_id),
  KEY IX_accounts_created_by(created_by),
  KEY IX_accounts_updated_by(updated_by),
  CONSTRAINT FK_accounts_client_id FOREIGN KEY(client_id) REFERENCES clients(id),
  CONSTRAINT FK_accounts_created_by FOREIGN KEY(created_by) REFERENCES users(id),
  CONSTRAINT FK_accounts_updated_by FOREIGN KEY(updated_by) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS payments(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  status TINYINT UNSIGNED NOT NULL,
  amount DECIMAL(10,2) NULL,
  currency VARCHAR(3) NULL,
  created_at DATETIME NULL,
  created_by BIGINT UNSIGNED NULL,
  updated_at DATETIME NULL,
  updated_by BIGINT UNSIGNED NULL,
  PRIMARY KEY (id),
  KEY IX_transactions_created_by(created_by),
  KEY IX_transactions_updated_by(updated_by),
  CONSTRAINT FK_transactions_created_by FOREIGN KEY(created_by) REFERENCES users(id),
  CONSTRAINT FK_transactions_updated_by FOREIGN KEY(updated_by) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;