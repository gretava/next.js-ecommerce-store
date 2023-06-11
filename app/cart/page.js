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

  let subTotal = 0;

  console.log(subTotal);

  return (
    <main className={styles.main}>
      <h1>Your cart</h1>
      <div className={styles.cartBody}>
        {/* <div className={styles.mainCart}> */}
        <div className={styles.cartSections}>
          <p>Product</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
        </div>
        <div
          // className={styles.cartContainer}
          data-test-id="cart-product-<product id>"
        >
          {itemsInCart.map((product) => {
            subTotal = product.quantity * product.price;
            return (
              <div
                className={styles.cartProducts}
                key={`product-${product.id}`}
              >
                <Link href={`/products/${product.id}`}>
                  <Image
                    className={styles.productImage}
                    src={`/images/${product.name}.jpg`}
                    width={120}
                    height={150}
                    alt={product.title}
                  />
                </Link>
                <div className={styles.productTitle}>{product.title}</div>
                {/* <div> */}
                <div>{product.price}</div>
                <form className={styles.productQuantity}>
                  <UpdateItemQuantity product={product} />
                  <RemoveProducts product={product} />
                </form>
                <div>{subTotal}</div>
                {/* </div> */}
                {/* <div>
                  <form><RemoveProducts product={product} /></form>
                </div> */}
              </div>
            );
          })}
        </div>
        {/* </div> */}
        <div data-test-id="cart-total">Total price: {totalPrice}</div>
        <Link
          className={styles.checkoutButton}
          type="button"
          data-test-id="cart-checkout"
          href="/checkout"
        >
          Checkout
        </Link>
      </div>
    </main>
  );
}
