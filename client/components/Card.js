import styles from "../styles/Card.module.css";
import illustration from "../public/Group.svg";
import Image from "next/image";
import Link from "next/link";
const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h2 className={styles.title}>Grow your knowledge with us</h2>
        <p>
          Explore from hundreds of books. Easy 3 steps to find your next
          favourite book. Search, select and buy.
        </p>
        <div className={styles.buttons}>
          <button className={styles.primary}>Explore</button>
          <Link href="/cart">
            <button className={styles.secondary}>View cart</button>
          </Link>
        </div>
      </div>
      <div className={styles.illustrations}>
        <Image src={illustration} className={styles.image} />
      </div>
    </div>
  );
};

export default Card;
