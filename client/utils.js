import { useRef, useEffect } from "react";
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

export function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        console.log("delta y", e.deltaY);
        if (
          !(el.scrollLeft === 0 && e.deltaY < 0) &&
          !(
            el.scrollWidth - el.clientWidth - Math.round(el.scrollLeft) === 0 &&
            e.deltaY > 0
          )
        ) {
          e.preventDefault();
        }
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}
