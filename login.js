import home from "./home.js";

let login = () => {
  return `
    <div>
      <form class="loginform">
        <h1>Login</h1>
        <input type="email" name="email" placeholder="Enter your E-Mail" required />
        <input type="password" name="password" placeholder="Enter your password" required />
        <input type="submit" value="Login" />
      </form>
    </div>
  `;
};

export const loginbinding = () => {
  const form = document.querySelector(".loginform");
  const state = {};

  form.addEventListener("change", (e) => {
    state[e.target.name] = e.target.value;
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      email: state.email,
      password: state.password
    };

    try {
      const res = await fetch("http://192.168.0.143:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.token) {
        alert(data.message);
        sessionStorage.setItem("tokens", data.token);
        history.pushState(null, "", "/home");
        window.dispatchEvent(new Event("popstate"));
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  });
};

export default login;
