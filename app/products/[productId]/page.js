import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductById } from '../../../database/products';
import productToUpdate from './actions';
import AddToCartForm from './AddToCartForm';

export const dynamic = 'force-dynamic';

export default async function SingleProductPage({ params }) {
  const singleProduct = await getProductById(Number(params.productId)); // convert string into a number

  // const products = await getProducts;

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
        alt=""
      />
      <p>{singleProduct.description}</p>
      <br />
      {productToUpdate.quantity}
      <AddToCartForm productId={singleProduct.id} />
    </main>
  );
}
