import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../database/products';
import styles from './page.module.scss';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main>
      <h1 className={styles.pageTitle}>Shop our products</h1>
      <section className={styles.productsPageContainer}>
        {products.map((product) => {
          return (
            <div key={`product-div-${product.id}`}>
              <Link href={`/products/${product.id}`}>
                <Image
                  src={`/images/${product.name}.jpg`}
                  width={300}
                  height={450}
                  alt={product.title}
                />
              </Link>
              <div>
                <Link
                  data-test-id="product-<product id>" // double check this one !!!
                  href={`/products/${product.id}`}
                >
                  {product.title}
                </Link>
              </div>
              <div>€ {product.price}</div>
            </div>
          );
        })}
      </section>
    </main>
  );
}