'use server';

import { cookies } from 'next/headers';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';

export default async function updateQuantity(productId, quantity) {
  // 1. get the current cookie
  // This gets the cookies from the Request Headers
  const productQuantityCookie = getCookie('cart');
  // 2. we parse the cookie
  const productQuantities = !productQuantityCookie
    ? // cookie is undefined
      // we need to create the new array with the productQuantity inside
      []
    : parseJson(productQuantityCookie);
  // 3. we edit the object

  // We get the object for the product in cookies or undefined
  const productToUpdate = productQuantities.find((productQuantity) => {
    return productQuantity.id === productId;
  });

  // the cookie is defined but have the product in the action
  // if we are in product 1
  if (productToUpdate) {
    // we need to update/add new quantity on top (not instead) of productQuantity
    productToUpdate.quantity = productToUpdate.quantity + quantity;
  } else {
    productQuantities.push({
      // we need insert the new productQuantity in cart
      id: productId,
      quantity,
    });
  }
  // 4. we override the cookie
  // This set the cookies into the Response Headers
  await cookies().set('cart', JSON.stringify(productQuantities));
}
