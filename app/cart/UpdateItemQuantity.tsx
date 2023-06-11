'use client';

import { useRouter } from 'next/navigation';
import { decreaseQuantity, increaseQuantity } from '../cart/actions';

type Props = {
  product: {
    quantity: number;
  };
};

export default function UpdateItemQuantity(props: Props) {
  const router = useRouter();

  return (
    <div>
      <button
        data-test-id=""
        formAction={async () => {
          router.refresh();
          await decreaseQuantity(props.product);
        }}
      >
        -
      </button>

      <div data-test-id="cart-product-quantity-<product id>">
        {props.product.quantity}
      </div>

      <button
        data-test-id=""
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
