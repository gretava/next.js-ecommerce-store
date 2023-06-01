'use client';

import { useRouter } from 'next/navigation';
import { decreaseQuantity, increaseQuantity } from '../cart/actions';

export default function UpdateItemQuantity({ product }) {
  const router = useRouter();

  return (
    <div>
      <button
        data-test-id=""
        formAction={async () => {
          router.refresh();
          await decreaseQuantity(product);
        }}
      >
        -
      </button>

      {product.quantity}

      <button
        data-test-id=""
        formAction={async () => {
          router.refresh();
          await increaseQuantity(product);
        }}
      >
        +
      </button>
    </div>
  );
}
