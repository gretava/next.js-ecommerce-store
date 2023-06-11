'use client';

import { useRouter } from 'next/navigation';
import { removeProduct } from './actions';
import styles from './RemoveProducts.module.scss';

type Props = {
  product: number;
};

export default function RemoveProducts(props: Props) {
  const router = useRouter();

  return (
    <div>
      <button
        className={styles.removeButton}
        data-test-id="cart-product-remove-<product id>"
        formAction={async () => {
          router.refresh();
          await removeProduct(props.product);
        }}
      >
        Remove
      </button>
    </div>
  );
}
