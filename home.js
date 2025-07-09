 import login,{loginbinding} from "./login.js";
 import navbar,{bindingAnchor} from "./navbar.js";

let home = () => {
  fetch("http://192.168.0.143:5000/api/auth/filtered_users", {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem("tokens")}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const html = data.map(user => `
        <div class="card">
          <img src="${user.image}" alt="${user.name}" />
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Age:</strong> ${user.age}</p>
          <p><strong>Gender:</strong> ${user.gender}</p>
          <p><strong>Zodiac:</strong> ${user.zodiacsign}</p>
          <p><strong>Religion:</strong> ${user.religion}</p>
          <p><strong>Qualification:</strong> ${user.qualification}</p>
          <p><strong>Job:</strong> ${user.job}</p>
          <p><strong>Location:</strong> ${user.area}, ${user.state} - ${user.pin}</p>
          <p><strong>Bio:</strong> ${user.bio}</p>
          <p><strong>Family:</strong> ${user.familydetails}</p>
          <p><strong>Hobbies:</strong> ${user.hobbies?.join(", ")}</p>
          <p><strong>Interests:</strong> ${user.intersts?.join(", ")}</p>
        </div>
      `).join("");
      document.querySelector("#root").innerHTML = html;
    })
    .catch(err => {
      console.error(err);
      document.querySelector("#root").innerHTML = "<p>Failed to load user data.</p>";
    });

  return "<p>Loading users...</p>";
};

export default home;
