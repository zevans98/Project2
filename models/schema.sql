DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

USE exampledb ;
CREATE TABLE users (
    user VARCHAR(50) NOT NULL
);
CREATE TABLE calorie (
    id INT NOT NULL AUTO_INCREMENT, 
    food VARCHAR(50) NOT NUll ,
    calories INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO calorie (food,calories)
VALUES ("apple", "50");