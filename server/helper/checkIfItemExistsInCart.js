const checkIfItemExistsInCart = (cart, bookId) => {
  const match = cart.filter((item, index) => {
    if (item.bookId.toString() === bookId) {
      item["index"] = index;
    }
    return item.bookId.toString() === bookId;
  });
  if (match.length > 0) {
    return {
      exists: true,
      index: match[0].index,
    };
  } else return { exists: false, index: null };
};

module.exports = checkIfItemExistsInCart;
