'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './checkoutForm.module.scss';

export default function CheckoutForm() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const validate = () => {
    return (
      firstName.length &&
      lastName.length &&
      email.length &&
      address.length &&
      city.length &&
      postalCode.length &&
      country.length &&
      creditCardNumber.length &&
      expirationDate.length &&
      securityCode.length
    );
  };

  return (
    <main className={styles.main}>
      <form className={styles.checkoutForm}>
        <div>
          <h3>Contact information</h3>
        </div>
        <div className={styles.contactInfo}>
          <label>
            First name
            <input
              data-test-id="checkout-first-name"
              placeholder="Erika"
              value={firstName}
              onChange={(event) => setFirstName(event.currentTarget.value)}
              required
            />
          </label>
          <label>
            Last name
            <input
              data-test-id="checkout-last-name"
              placeholder="Eder"
              value={lastName}
              onChange={(event) => setLastName(event.currentTarget.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email
            <input
              data-test-id="checkout-email"
              placeholder="erika@example.com"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Address
            <input
              data-test-id="checkout-address"
              placeholder="Graben 2/1/3"
              value={address}
              onChange={(event) => setAddress(event.currentTarget.value)}
              required
            />
          </label>
        </div>
        <div className={styles.addressInfo}>
          <label>
            City
            <input
              data-test-id="checkout-city"
              placeholder="Vienna"
              value={city}
              onChange={(event) => setCity(event.currentTarget.value)}
              required
            />
          </label>
          <label>
            Postal code
            <input
              data-test-id="checkout-postal-code"
              placeholder="1010"
              value={postalCode}
              onChange={(event) => setPostalCode(event.currentTarget.value)}
              required
            />
          </label>
          <label>
            Country
            <input
              data-test-id="checkout-country"
              placeholder="Austria"
              value={country}
              onChange={(event) => setCountry(event.currentTarget.value)}
              required
            />
          </label>
        </div>

        <div>
          <h3>Payment details</h3>
        </div>

        <div>
          <label>
            Credit card number
            <input
              data-test-id="checkout-credit-card"
              placeholder="1111-2222-3333-4444"
              value={creditCardNumber}
              onChange={(event) =>
                setCreditCardNumber(event.currentTarget.value)
              }
              required
            />
          </label>
        </div>

        <div className={styles.paymentInfo}>
          <label>
            Expiration date
            <input
              data-test-id="checkout-expiration-date"
              placeholder="MM/YY"
              value={expirationDate}
              onChange={(event) => setExpirationDate(event.currentTarget.value)}
              required
            />
          </label>

          <label>
            CVV
            <input
              data-test-id="checkout-security-code"
              placeholder="123"
              value={securityCode}
              onChange={(event) => setSecurityCode(event.currentTarget.value)}
              required
            />
          </label>
        </div>
        <br />
        <br />

        <div className={styles.btns}>
          <button
            type="button"
            data-test-id="checkout-confirm-order"
            onClick={() => router.push('/checkout/thank-you')}
            disabled={!validate()}
          >
            Confirm order
          </button>
          <button type="button" onClick={() => router.push('/cart')}>
            Back to cart
          </button>
        </div>
      </form>
    </main>
  );
}
