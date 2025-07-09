 import home from "./home.js"
 import login, { loginbinding } from "./login.js"
 import register, { registerbindhandler } from "./register.js"  

let navbar = () => {
  return `
    <a href="/login" id="one">Login</a>
    <a href="/register" id="two">Register</a>
    <a href="/home" id="three">Home</a>
  `;
};

export const bindingAnchor = () => {
  let root = document.querySelector("#root");
  let anchors = document.querySelectorAll("a");

  anchors.forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const path = anchor.getAttribute("href");
      history.pushState(null, "", path);
      window.dispatchEvent(new Event("popstate"));
    });
  });
};

export default navbar