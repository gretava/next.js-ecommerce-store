import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductById } from '../../../database/products';
import AddToCartForm from './AddToCartForm';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    productId: string; // this is a string because the productId is in the url
  };
};

export default async function SingleProductPage(props: Props) {
  const singleProduct = await getProductById(Number(props.params.productId)); // convert string into a number

  // const products = await getProducts;

  if (!singleProduct) {
    notFound();
  }

  return (
    <main className={styles.productBody}>
      <div className={styles.productCard}>
        <div>
          <Image
            data-test-id="product-image"
            src={`/images/${singleProduct.name}.jpg`}
            height={500}
            width={380}
            alt={singleProduct.title}
          />
        </div>
        <div className={styles.productContent}>
          <h1>{singleProduct.title}</h1>
          <h4 data-test-id="product-price">€ {singleProduct.price}</h4>
          <p>{singleProduct.description}</p>
          <AddToCartForm productId={singleProduct.id} />
        </div>

        {/* <br /> */}
        {/* {productToUpdate.quantity} */}
      </div>
    </main>
  );
}
