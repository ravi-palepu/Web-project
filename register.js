 import login from "./login.js";
 import navbar,{bindingAnchor} from "./navbar.js";
import login, { loginbinding } from "./login.js";

let register = () => {
  return `
    <div class="registrationform">
      <form class="regform">
        <h1>Register</h1>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <input type="text" name="age" placeholder="Age" required />
        <input type="radio" name="gender" value="Male" /> Male
        <input type="radio" name="gender" value="Female" /> Female
        <input type="radio" name="gender" value="Other" /> Other
        <input type="text" name="job" placeholder="Job" />
        <input type="text" name="qualification" placeholder="Qualification" />
        <select name="zodiacSign">
          <option disabled selected>Select Zodiac</option>
          <option>Aries</option><option>Taurus</option><option>Gemini</option>
          <option>Cancer</option><option>Leo</option><option>Virgo</option>
          <option>Libra</option><option>Scorpio</option><option>Sagittarius</option>
          <option>Capricorn</option><option>Aquarius</option><option>Pisces</option>
        </select>
        <input type="text" name="religion" placeholder="Religion" />
        <textarea name="bio" placeholder="Bio"></textarea>
        <textarea name="familydetails" placeholder="Family Details"></textarea>
        <input type="text" name="area" placeholder="Area" />
        <input type="text" name="state" placeholder="State" />
        <input type="text" name="pin" placeholder="Pin Code" />
        <label>Hobbies:</label>
        <input type="checkbox" name="hobbies" value="Reading" /> Reading
        <input type="checkbox" name="hobbies" value="Music" /> Music
        <input type="checkbox" name="hobbies" value="Traveling" /> Traveling
        <label>Interests:</label>
        <input type="checkbox" name="interests" value="Art" /> Art
        <input type="checkbox" name="interests" value="Tech" /> Tech
        <input type="file" name="image" />
        <input type="submit" value="Register" />
      </form>
    </div>
  `;
};

export const registerbindhandler = () => {
  const form = document.querySelector(".regform");
  const state = { hobbies: [], interests: [] };

  form.addEventListener("change", (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      if (checked) state[name].push(value);
      else state[name] = state[name].filter((v) => v !== value);
    } else if (type === "file") {
      state[name] = files[0];
    } else {
      state[name] = value;
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in state) {
      if (Array.isArray(state[key])) {
        formData.append(key, JSON.stringify(state[key]));
      } else {
        formData.append(key, state[key]);
      }
    }

    try {
      const res = await fetch("http://192.168.0.143:5000/api/auth/register", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.message === "user registered successfully") {
        alert("Registered Successfully");
        history.pushState(null, "", "/login");
        window.dispatchEvent(new Event("popstate"));
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  });
};

export default register;

