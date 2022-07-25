import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import styles from "../styles/Checkout.module.css";
import Image from "next/image";
const cart = () => {
  const { user, setUser } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (user) {
      setCart(() => user.cartItems);
    }
  }, [user]);

  const removeFromCart = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/remove/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.status === "success") {
        const cartItems = user.cartItems.filter((item) => item.bookId != id);
        setUser((prev) => {
          return {
            ...prev,
            cartItems,
          };
        });
        setCart(() => cart.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(
        cart.map((item) => {
          return { id: item.bookId, quantity: item.quantity };
        })
      ),
    });
    const { status, message } = await res.json();
    if (status === "success") {
      window.location = message.url;
    } else {
      console.log(message);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Cart</h2>
        {cart.length === 0 && (
          <div className={styles.emptyCart}>
            <p>{":("}</p>
            <p>Your cart is empty</p>
          </div>
        )}
        {cart.length > 0 &&
          cart[0]?.image &&
          cart.map((item) => {
            return (
              <div className={styles.item}>
                <div className={styles.itemDetails}>
                  <p className={styles.itemTitle}>
                    {`${item.title} `} <span>(X{item.quantity})</span>
                  </p>
                  <p className={styles.price}>
                    Rs: {item.price}{" "}
                    <span
                      className={styles.remove}
                      onClick={() => {
                        removeFromCart(item.bookId);
                      }}
                    >
                      Remove
                    </span>
                  </p>
                </div>
                <div className={styles.imageWrapper}>
                  <Image src={item.image} layout="fill" />
                </div>
              </div>
            );
          })}
      </div>
      {cart.length > 0 && (
        <div className={styles.buttons}>
          <h3>
            Total:{" "}
            <span>
              Rs{" "}
              {cart.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.price * currentValue.quantity;
              }, 0)}
            </span>
          </h3>
          <button
            className={styles.primary}
            onClick={() => {
              checkout();
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </>
  );
};

export default cart;
