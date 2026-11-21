
const CART_KEY = "gheelagbe-cart";

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  const englishName =
    product.name_en ||
    (typeof product.name === "string" ? product.name : product.name?.en || "");
  const banglaName =
    product.name_bn ||
    (typeof product.name === "object" ? product.name?.bn : "");

  let updatedCart;

  if (existingItem) {
    updatedCart = cart.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + quantity,
            name_bn: item.name_bn || banglaName,
            name_en: item.name_en || englishName,
          }
        : item
    );
  } else {
    updatedCart = [
      ...cart,
      {
        id: product.id,
        slug: product.slug,
        name: englishName || product.name,
        name_bn: banglaName,
        name_en: englishName,
        price: product.price,
        image: product.image,
        weight: product.weight,
        weight_bn: product.weight_bn,
        quantity,
      },
    ];
  }

  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("gheelagbe-cart-updated"));

  return updatedCart;
};

export const getCartCount = () =>
  getCart().reduce((total, item) => total + item.quantity, 0);

export const removeFromCart = (productId) => {
  const updatedCart = getCart().filter((item) => item.id !== productId);

  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("gheelagbe-cart-updated"));

  return updatedCart;
};

export const updateCartQuantity = (productId, quantity) => {
  if (quantity < 1) return removeFromCart(productId);

  const updatedCart = getCart().map((item) =>
    item.id === productId ? { ...item, quantity } : item
  );

  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("gheelagbe-cart-updated"));

  return updatedCart;
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("gheelagbe-cart-updated"));
};
