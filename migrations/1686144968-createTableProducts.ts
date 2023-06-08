import { Sql } from 'postgres';

export type Product = {
  id: number;
  title: string;
  name: string;
  price: number;
  description: string | null;
};

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE products (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title varchar(100) NOT NULL,
    name varchar(100) NOT NULL,
    -- price number,
    price varchar(30) NOT NULL,
    description varchar(600)
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE products
  `;
}
