import Image from 'next/image';
import Link from 'next/link';
import soap1 from '../public/images/soap1.jpg';
// import step from '../public/images/step.jpg';
import styles from './page.module.scss';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function HomePage() {
  return (
    <main>
      <section className={styles.heroWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            priority
            src={soap1}
            fill={true}
            style={{ objectFit: 'cover' }}
            alt="handmade soap"
          />
        </div>
        {/* <div>
          <button className={styles.heroButton}>shop all</button>
        </div> */}
      </section>
    </main>
  );
}
