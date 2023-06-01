'use client';

import { useRouter } from 'next/navigation';
import { removeProduct } from './actions';

export default function RemoveProducts({ product }) {
  const router = useRouter();

  return (
    <div>
      <button
        data-test-id="cart-product-remove-<product id>"
        formAction={async () => {
          router.refresh();
          await removeProduct(product);
        }}
      >
        X
      </button>
    </div>
  );
}
