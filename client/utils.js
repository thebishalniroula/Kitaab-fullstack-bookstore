export const addToCart = async (id, title, image, price, setUser) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/add/${id}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await res.json();
    if (data.status === "success") {
      setUser((prev) => {
        return {
          ...prev,
          cartItems: [
            ...prev.cartItems,
            { bookId: id, title, image, price, quantity: 1 },
          ],
        };
      });
    }
  } catch (error) {
    console.log(error);
  }
};
