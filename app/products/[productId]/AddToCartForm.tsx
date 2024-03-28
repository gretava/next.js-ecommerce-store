'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import updateQuantity from './actions';
import styles from './AddToCartForm.module.scss';

type Props = {
  productId: number;
};

export default function AddToCartForm(props: Props) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <form className={styles.form}>
      <div className={styles.quantityControl}>
        <button
          className={styles.quantityButton}
          onClick={(event) => {
            event.preventDefault();
            decrementQuantity();
          }}
          data-test-id="quantity-decrement"
        >
          -
        </button>
        <div className={styles.quantityInput}>{quantity}</div>
        <button
          className={styles.quantityButton}
          onClick={(event) => {
            event.preventDefault();
            incrementQuantity();
          }}
          data-test-id="quantity-increment"
        >
          +
        </button>
      </div>
      <button
        className={styles.button}
        data-test-id="product-add-to-cart"
        formAction={async () => {
          router.refresh();
          await updateQuantity(props.productId, quantity);
        }}
      >
        Add to Cart
      </button>
    </form>
  );
}
