import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductById } from '../../../database/products';

export const dynamic = 'force-dynamic';

export default function SingleProductPage({ params }) {
  const singleProduct = getProductById(Number(params.productId)); // Convert the string into a number

  if (!singleProduct) {
    notFound();
  }

  return (
    <main>
      <h1>{singleProduct.title}</h1>
      <Image
        data-test-id="product-image"
        src={`/images/${singleProduct.name}.jpg`}
        width={200}
        height={300}
      />
      <br />
      This is single product page
    </main>
  );
}
