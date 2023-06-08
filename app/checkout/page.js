import CheckoutForm from './CheckoutForm';
import OrderSummaryPage from './OrderSummary';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
  // const router = useRouter();

  return (
    <>
      <h1>Checkout page</h1>
      <main className={styles.main}>
        <CheckoutForm />
        <OrderSummaryPage />
      </main>
    </>
  );
}
