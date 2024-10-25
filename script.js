const passwordList = document.getElementById("passwordList");

function addPassword() {
  const website = document.getElementById("website").value;
  const password = document.getElementById("password").value;

  if (website && password) {
    const listItem = document.createElement("li");
    listItem.classList.add("password-item");

    listItem.innerHTML = `
            <span><strong>${website}</strong>: <span class="password-text">******</span></span>
            <span class="show-btn" onclick="togglePassword(this, '${password}')">Show</span>
        `;

    passwordList.appendChild(listItem);
    document.getElementById("website").value = "";
    document.getElementById("password").value = "";
  } else {
    alert("Please fill out both fields.");
  }
}

function togglePassword(element, password) {
  const passwordText =
    element.previousElementSibling.querySelector(".password-text");
  if (passwordText.innerText === "******") {
    passwordText.innerText = password;
    element.innerText = "Hide";
  } else {
    passwordText.innerText = "******";
    element.innerText = "Show";
  }
}
