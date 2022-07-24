import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import styles from "../styles/Checkout.module.css";
import Image from "next/image";
const cart = () => {
  const { user, setUser } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    // user?.cartItems.map(async (item) => {
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${item.bookId}`,
    //     {
    //       method: "GET",
    //       credentials: "include",
    //     }
    //   );
    //   const data = await res.json();
    //   data.message["quantity"] = item.quantity;

    //   setCart((prev) => {
    //     const newCart = [...prev, data.message];
    //     return newCart;
    //   });
    // });

    if (user) {
      console.log("caritems", user.cartItems);
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
            console.log(item);
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
              {cart.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.price * currentValue.quantity;
              }, 0)}
            </span>
          </h3>
          <button className={styles.primary}>Checkout</button>
        </div>
      )}
    </>
  );
};

export default cart;
