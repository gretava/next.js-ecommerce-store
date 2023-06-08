import { cache } from 'react';
import { Product } from '../migrations/1686144968-createTableProducts';
import { sql } from './connect';

// export const products = [
//   {
//     id: 1,
//     title: 'Handmade soap',
//     name: 'soap',
//     price: '8.99',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
//   },
//   {
//     id: 2,
//     title: 'Water bottle',
//     name: 'bottle',
//     price: '25.99',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
//   },
//   {
//     id: 3,
//     title: 'Example1',
//     name: 'tote',
//     price: '15.99',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
//   },
//   {
//     id: 4,
//     title: 'Example2',
//     name: 'shaver',
//     price: '35.99',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
//   },
// ];

// export function getProductById(id: number) {
//   return products.find((product) => product.id === id);
// }

// type Product = {
//   id: number;
//   title: string;
//   name: string;
//   price: number;
//   description: string | null;
// };

export const getProducts = cache(async () => {
  const products = await sql<Product[]>`
    SELECT * FROM products
  `;
  return products;
});

export const getProductById = cache(async (id: number) => {
  const [product] = await sql<Product[]>`
  SELECT
    *
  FROM
    products
  WHERE
    id = ${id}
  `;
  return product;
});
