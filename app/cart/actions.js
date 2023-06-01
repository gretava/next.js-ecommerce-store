'use server';

import { cookies } from 'next/headers';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';

export async function decreaseQuantity(item) {
  const productQuantityCookie = getCookie('cart');
  const productQuantities = !productQuantityCookie
    ? []
    : parseJson(productQuantityCookie);

  const decrementQuantity = productQuantities.find((product) => {
    return product.id === item.id;
  });
  decrementQuantity.quantity -= 1;

  await cookies().set('cart', JSON.stringify(productQuantities));
}

export async function increaseQuantity(item) {
  const productQuantityCookie = getCookie('cart');
  const productQuantities = !productQuantityCookie
    ? []
    : parseJson(productQuantityCookie);

  const incrementQuantity = productQuantities.find((product) => {
    return product.id === item.id;
  });
  incrementQuantity.quantity += 1;

  await cookies().set('cart', JSON.stringify(productQuantities));
}

export async function removeProduct(item) {
  const productQuantityCookie = getCookie('cart');
  const productQuantities = !productQuantityCookie
    ? []
    : parseJson(productQuantityCookie);

  const deleteItem = productQuantities.filter((product) => {
    return product.id !== item.id; // return a new array without the item that has been deleted
  });

  await cookies().set('cart', JSON.stringify(deleteItem));
}
