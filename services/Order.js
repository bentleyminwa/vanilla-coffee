import { getProductById } from "./Menu.js";

export async function addToCart(id) {
  const product = await getProductById(id);

  const results = app.store.cart.filter(
    (productInCart) => productInCart.product.id == id
  );

  if (results.length == 1) {
    // product is already in the cart
    // update quantity of the product
    app.store.cart = app.store.cart.map((p) => {
      if (p.product.id == id) {
        return {
          ...p,
          quantity: p.quantity + 1,
        };
      }
      return p;
    });
  } else {
    app.store.cart = [...app.store.cart, { product, quantity: 1 }];
  }
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter((productInCart) => {
    return productInCart.product.id != id;
  });
}
