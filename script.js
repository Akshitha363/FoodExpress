// ------------------ CART CODE ------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.innerText = count;
}

function loadCart() {
  const cartBox = document.getElementById("cart-items");
  const totalBox = document.getElementById("cart-total");

  if (!cartBox || !totalBox) return;

  cartBox.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartBox.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <p>${item.name}</p>
          <p>₹${item.price} x ${item.qty}</p>
        </div>
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
  });

  totalBox.innerText = "₹" + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

updateCartCount();
loadCart();

// ------------------ REGISTER FUNCTION ------------------
function validateRegister() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  let isValid = true;
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";

  if (name === "") {
    document.getElementById("nameError").textContent = "Name is required";
    isValid = false;
  }
  if (email === "") {
    document.getElementById("emailError").textContent = "Email is required";
    isValid = false;
  }
  if (password === "") {
    document.getElementById("passwordError").textContent = "Password is required";
    isValid = false;
  }

  if (!isValid) return false;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(u => u.email === email)) {
    alert("Email already registered!");
    return false;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
  window.location.href = "login.html";
  return false;
}

// ------------------ LOGIN FUNCTION ------------------
function validateLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  let isValid = true;
  document.getElementById("loginEmailError").textContent = "";
  document.getElementById("loginPasswordError").textContent = "";

  if (email === "") {
    document.getElementById("loginEmailError").textContent = "Email is required";
    isValid = false;
  }
  if (password === "") {
    document.getElementById("loginPasswordError").textContent = "Password is required";
    isValid = false;
  }

  if (!isValid) return false;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password!");
    return false;
  }

  localStorage.setItem("loggedInUser", email);
  window.location.href = "catalog.html";
  return false;
}

// ------------------ LOGOUT ------------------
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
