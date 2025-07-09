import login, { loginbinding } from "./login.js";
import register, { registerbindhandler } from "./register.js";
import home from "./home.js";
import navbar, { bindingAnchor } from "./navbar.js";

let root = document.querySelector("#root");
document.querySelector("#navbar").innerHTML = navbar();
bindingAnchor();

let routes = {
  "/login": [login, loginbinding],
  "/register": [register, registerbindhandler],
  "/home": [home]
};

const loadPage = (path) => {
  const component = routes[path];
  if (component) {
    root.innerHTML = component[0]();
    if (component[1]) component[1]();
  } else {
    root.innerHTML = "<h2>404 Page Not Found</h2>";
  }
};

// Initial load
let currentPath = window.location.pathname;
if (currentPath === "/" || currentPath === "/index.html") {
  history.replaceState(null, "", "/login");
  currentPath = "/login";
}
loadPage(currentPath);

// Handle back/forward
window.addEventListener("popstate", () => {
  loadPage(window.location.pathname);
});
