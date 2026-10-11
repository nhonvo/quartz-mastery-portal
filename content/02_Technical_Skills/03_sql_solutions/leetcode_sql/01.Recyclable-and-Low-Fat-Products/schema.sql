-- schema.sql (PostgreSQL DDL & Seed Data for Recyclable and Low Fat Products)
DROP TABLE IF EXISTS SampleTable CASCADE;

CREATE TABLE SampleTable (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    value VARCHAR(255)
);

INSERT INTO SampleTable (id, name, value) VALUES
(1, 'Item A', 'Y'),
(2, 'Item B', 'N'),
(3, 'Item C', 'Y');
