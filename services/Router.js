const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        const url = event.target.getAttribute("href");
        Router.go(url);
      });
    });
    // check initial route
    Router.go(location.pathname);

    // Event handler for checking URL changes - preserving the behaviour of the browser's forward and back buttons
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });
  },
  go: (route, addToHistory = true) => {
    console.log(`Navigating to ${route}`);

    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        break;
      default:
        if (route.startsWith("/product/")) {
          pageElement = document.createElement("details-page");

          const paramId = route.substring(route.lastIndexOf("/") + 1);
          pageElement.dataset.productId = paramId;
        }
    }

    if (pageElement) {
      const cache = document.querySelector("main");

      cache.innerHTML = "";
      cache.appendChild(pageElement);
      window.scrollTo(0, 0);
    }
  },
};

export default Router;
