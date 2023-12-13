import './globals.scss';
// import { Inter } from 'next/font/google';
import Link from 'next/link';
// import { products } from '../database/products';
import styles from './layout.module.scss';
import TotalCart from './TotalCart';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

type LayoutProps = {
  children: string;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <header>
          <section className={styles.navigationBar}>
            <div>
              <ul className={styles.navigationLinksLeft}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link data-test-id="products-link" href="/products">
                    Products
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.nameHeader}>
              <h1>
                <a href="/">zero hero</a>
              </h1>
            </div>
            <div>
              <ul className={styles.navigationLinksRight}>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link data-test-id="cart-link" href="/cart">
                    Cart
                  </Link>
                  <span data-test-id="cart-count">
                    {' '}
                    (<TotalCart />)
                  </span>
                </li>
              </ul>
            </div>
          </section>
        </header>

        {children}

        <footer className={styles.footerSection}>
          <section>
            <h1>The newsletter</h1>
            <form>
              <input name="subscription-field" placeholder="your email" />
              <p>
                Stay up to date on new products, special discounts and free
                giveaways.
              </p>
              <button>send</button>
            </form>
          </section>
          <div>
            <p>123 This street, This City</p>
          </div>
          <div>
            <p>hello@company.com</p>
          </div>
          <div>
            <p>social media icons</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
