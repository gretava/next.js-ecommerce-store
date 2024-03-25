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
    <main>
      <div className={styles.cartBody}>
        {itemsInCart.length === 0 ? (
          <div className={styles.emptyCartMessage}>
            Your cart is empty. <br />
            <Link href="/products" className={styles.checkoutButton}>
              Shop now
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.cartSections}>
              <span>
                <li>Product</li>
              </span>
              <li>Price</li>
              <li>Quantity</li>
              <li>Subtotal</li>
            </div>
            <div data-test-id="cart-product-<product id>">
              {itemsInCart.map((product) => {
                subTotal = product.quantity * product.price;
                return (
                  <div
                    className={styles.cartProducts}
                    key={`product-${product.id}`}
                  >
                    <div className={styles.productTitleDiv}>
                      <Link href={`/products/${product.id}`}>
                        <Image
                          className={styles.productImage}
                          src={`/images/${product.name}.jpg`}
                          width={150}
                          height={180}
                          alt={product.title}
                        />
                      </Link>
                      <div className={styles.productTitle}>{product.title}</div>
                    </div>
                    <div>€{product.price}</div>
                    <form>
                      <UpdateItemQuantity product={product} />
                    </form>
                    <div>€{subTotal.toFixed(2)}</div>
                    <div>
                      <form>
                        <RemoveProducts product={product} />
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.totalCheckout}>
              <div data-test-id="cart-total">
                <span>Total price €{totalPrice.toFixed(2)}</span>
              </div>
              <div>
                <Link
                  className={styles.checkoutButton}
                  type="button"
                  data-test-id="cart-checkout"
                  href="/checkout"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
