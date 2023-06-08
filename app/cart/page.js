import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../database/products';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';
import styles from './page.module.scss';
import RemoveProducts from './RemoveProducts';
import UpdateItemQuantity from './UpdateItemQuantity';

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const products = await getProducts();

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
    <main className={styles.main}>
      <h1>Your cart</h1>
      <section className={styles.cartSections}>
        <div className={styles.cartHead}>
          <p className={styles.cartHead}>Product</p>
          <p className={styles.cartHead}>Title</p>
          <p>Quantity</p>
          <p>Price</p>
        </div>
      </section>
      <div className={styles.cartContainer}>
        {itemsInCart.map((product) => {
          return (
            <div key={`product-${product.id}`}>
              <Link href={`/products/${product.id}`}>
                <div>
                  <Image
                    src={`/images/${product.name}.jpg`}
                    width={100}
                    height={150}
                    alt={product.title}
                  />
                </div>
                <div>{product.title}</div>
              </Link>
              <div>{product.price}</div>
              <form>
                <UpdateItemQuantity product={product} />
              </form>

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

      <Link
        className={styles.checkoutButton}
        type="button"
        data-test-id="cart-checkout"
        href="/checkout"
      >
        Checkout
      </Link>
    </main>
  );
}
