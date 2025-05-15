import CartItem from "./components/CartItem.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { MenuPage } from "./components/MenuPage.js";
import { OrderPage } from "./components/OrderPage.js";
import ProductItem from "./components/ProductItem.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";
import Store from "./services/Store.js";

window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", () => {
  loadData();
  Router.init();
});

window.addEventListener("appcartchanged", (e) => {
  const badge = document.querySelector("#badge");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
