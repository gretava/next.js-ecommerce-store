'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import updateQuantity from './actions';

export default function AddToCartForm(props) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  return (
    <form>
      <input
        data-test-id="product-quantity"
        type="number"
        min="1"
        // max={15}
        value={quantity}
        onChange={(event) => {
          setQuantity(Number(event.currentTarget.value));
        }}
      />
      <button
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
