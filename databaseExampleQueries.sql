-- this file will not run, it's created only to save the queries so we can have easy access to it.

-- Create products table
CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(100) NOT NULL,
  name varchar(100) NOT NULL,
  price varchar(30) NOT NULL,
  description varchar(600)
);

-- Insert products
INSERT INTO products
  (title, name, price, description)
VALUES
  (
  'Handmade soap',
  'soap',
  '8.99',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
),
  (
  'Water bottle',
  'bottle',
  '25.99',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
  ),
  (
  'Example1',
  'tote',
  '15.99',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
  ),
  (
  'Example2',
  'shaver',
  '35.99',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
  );

-- Read product
SELECT * FROM products;
