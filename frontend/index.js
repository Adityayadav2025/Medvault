function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  console.log("📨 Attempting to register:", email);

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("✅ Registered user:", userCredential.user);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("🚨 Registration error:", error);
      alert("Registration failed: " + error.message);
    });
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  console.log("🔑 Attempting to login:", email);

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("✅ Logged in user:", userCredential.user);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("🚨 Login error:", error);
      alert("Login failed: " + error.message);
    });
}
