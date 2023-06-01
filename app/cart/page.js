import Link from 'next/link';
import { products } from '../../database/products';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';
import RemoveProducts from './RemoveProducts';
import UpdateItemQuantity from './UpdateItemQuantity';

export const dynamic = 'force-dynamic';

export default function CartPage() {
  // const products = await lsProducts;

  const productQuantityCookie = getCookie('cart');

  const productQuantities = !productQuantityCookie
    ? // cookie is undefined
      // we need to create the new array with the productQuantity inside
      []
    : parseJson(productQuantityCookie);

  const productsWithQuantities = products.map((product) => {
    // map() method is commonly used to apply some changes to the elements
    const matchingProductFromCookie = productQuantities.find(
      // find() method returns the value of the first element that passes a test
      (productObject) => product.id === productObject.id,
    );

    return {
      ...product,
      quantity: matchingProductFromCookie?.quantity,
    };
  });

  const itemsInCart = productsWithQuantities.filter((item) => item.quantity); // filter() creates a new array filled with elements that pass a test provided by a function

  console.log(itemsInCart);

  // /////// GET TOTAL PRICE /////////

  const initialValue = 0;
  const totalPrice = itemsInCart.reduce(
    (accumulator, current) => accumulator + current.price * current.quantity,
    initialValue,
  );

  console.log(totalPrice);

  return (
    <main>
      <h1>Your cart</h1>
      <div>
        {itemsInCart.map((product) => {
          return (
            <div key={`product-${product.id}`}>
              <Link href={`/products/${product.id}`}>
                <div>{product.title}</div>
              </Link>

              <div>{product.price}</div>
              <form>
                <UpdateItemQuantity product={product} />
              </form>
              {/* <div>{product.quantity}</div> */}
              <form>
                <RemoveProducts product={product} />
              </form>
            </div>
          );
        })}
      </div>
      <br />
      <br />

      <div data-test-id="cart-total">Total price: {totalPrice}</div>
    </main>
  );
}
