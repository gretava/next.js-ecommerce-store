export const products = [
  { id: 1, title: 'Handmade soap', name: 'soap', price: '8.99' },
  { id: 2, title: 'Water bottle', name: 'bottle', price: '25.99' },
  { id: 3, title: 'Example1', name: 'tote', price: '15.99' },
  { id: 4, title: 'Example2', name: 'shaver', price: '35.99' },
];

export function getProductById(id) {
  return products.find((product) => product.id === id);
}
