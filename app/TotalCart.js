import { getCookie } from '../util/cookies';
import { parseJson } from '../util/json';

export default function TotalCart() {
  const productQuantityCookie = getCookie('cart');
  const productQuantities = !productQuantityCookie
    ? []
    : parseJson(productQuantityCookie);

  const quantity = productQuantities.map((item) => item.quantity);

  const cartTotal = quantity.reduce(
    (accumulator, currentNumber) => accumulator + currentNumber,
    0,
  );
  return <span>{cartTotal}</span>;
}
