import Link from 'next/link';
import { getProducts } from '../../database/products';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';
import styles from './orderSummary.module.scss';

// import UpdateItemQuantity from '../cart/UpdateItemQuantity';

export const dynamic = 'force-dynamic';

export default async function OrderSummaryPage() {
  const products = await getProducts();

  // const router = useRouter();

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

  // /////// GET TOTAL PRICE /////////

  const initialValue = 0;
  const totalPrice = itemsInCart.reduce(
    (accumulator, current) => accumulator + current.price * current.quantity,
    initialValue,
  );

  return (
    <main className={styles.main}>
      <h3>Order summary</h3>
      <ul>
        {itemsInCart.map((product) => {
          return (
            <div className={styles.orderSummary} key={`product-${product.id}`}>
              <li>
                {' '}
                <Link href={`/products/${product.id}`}>
                  <div className={styles.productTitle}>{product.title}</div>
                </Link>
              </li>
              <div>Qty: {product.quantity}</div>
              <div className={styles.price}>EUR {product.price}</div>
            </div>
          );
        })}
      </ul>
      {/* <br /> */}
      <div className={styles.totalPrice}>Total price: EUR {totalPrice}</div>
    </main>
    // {totalPrice}
  );
}
