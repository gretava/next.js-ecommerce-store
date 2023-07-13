'use client';

import { useRouter } from 'next/navigation';
import { decreaseQuantity, increaseQuantity } from '../cart/actions';
import styles from './UpdateItemQuantity.module.scss';

type Props = {
  product: {
    quantity: number;
  };
};

export default function UpdateItemQuantity(props: Props) {
  const router = useRouter();

  return (
    <div className={styles.quantityButton}>
      <button
        className={styles.buttonMinusPlus}
        formAction={async () => {
          router.refresh();
          await decreaseQuantity(props.product);
        }}
      >
        -
      </button>

      <div
        className={styles.inputField}
        data-test-id="cart-product-quantity-<product id>"
      >
        {props.product.quantity}
      </div>

      <button
        className={styles.buttonMinusPlus}
        formAction={async () => {
          router.refresh();
          await increaseQuantity(props.product);
        }}
      >
        +
      </button>
    </div>
  );
}
