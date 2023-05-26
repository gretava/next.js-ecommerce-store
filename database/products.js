export const products = [
  {
    id: 1,
    title: 'Handmade soap',
    name: 'soap',
    price: '8.99',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
  },
  {
    id: 2,
    title: 'Water bottle',
    name: 'bottle',
    price: '25.99',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
  },
  {
    id: 3,
    title: 'Example1',
    name: 'tote',
    price: '15.99',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
  },
  {
    id: 4,
    title: 'Example2',
    name: 'shaver',
    price: '35.99',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
  },
];

export function getProductById(id) {
  return products.find((product) => product.id === id);
}
