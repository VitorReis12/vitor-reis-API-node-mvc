CREATE DATABASE IF NOT EXISTS pw_api
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE pw_api;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nome, email) VALUES
  ('Ana Souza', 'ana.souza@example.com'),
  ('Bruno Lima', 'bruno.lima@example.com'),
  ('Carla Mendes', 'carla.mendes@example.com');
