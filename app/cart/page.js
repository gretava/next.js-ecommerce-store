import Link from 'next/link';
import { products } from '../../database/products';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';

export const dynamic = 'force-dynamic';

export default function CartPage() {
  const productQuantityCookie = getCookie('cart');

  const productQuantities = !productQuantityCookie
    ? // cookie is undefined
      // we need to create the new array with the productQuantity inside
      []
    : parseJson(productQuantityCookie);

  const productsWithQuantities = products.map((product) => {
    const matchingProductFromCookie = productQuantities.find(
      (productObject) => product.id === productObject.id,
    );

    return {
      ...product,
      quantity: matchingProductFromCookie?.quantity,
    };
  });

  // const productsInCart = productsWithQuantities.filter((item) => item.quantity);

  // console.log(productsInCart);

  return (
    <main>
      This is cart page
      <div>
        {productsWithQuantities.map((product) => {
          return (
            <div key={`product-${product.id}`}>
              <Link href={`/products/${product.id}`}>
                <div>{product.title}</div>
              </Link>
              {product.quantity}
            </div>
          );
        })}
      </div>
    </main>
  );
}
