import home from "./home.js"
import login, { loginbinding } from "./login.js"
import register, { registerbindhandler } from "./register.js"                                                                 let root = document.querySelector("#root")
let router = {
  "/login": [login,loginbinding],
  "/register": [register,registerbindhandler],
  "/home": [home]
}
let allanchor = document.querySelectorAll("a")

// console.log(allanchor);
function pageloader(e) {
  e.preventDefault()

  history.pushState(null, "", `${e.target.pathname}`)
  let path = window.location.pathname
  // console.log(path);

  root.innerHTML = router[path][0]()
  if(router[path][1]){
    router[path][1]()
  }
}
allanchor.forEach((a) => {
  a.addEventListener("click", pageloader)
})

window.addEventListener("popstate", (e) => {
  let path = window.location.pathname
  console.log(path)
  if (path == "/index.html") {
    root.innerHTML = ""
  }
  else {
    root.innerHTML = router[path]()
  }
})