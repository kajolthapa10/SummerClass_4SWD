const form = document.getElementById("registrationForm");
const successPopup = document.getElementById("successPopup");
const popupMessage = document.getElementById("popupMessage");

// Profile Picture
const browseBtn = document.getElementById("browseBtn");
const profilePicInput = document.getElementById("profilePic");
const fileNameSpan = document.getElementById("fileName");
const imagePreview = document.getElementById("imagePreview");

browseBtn.addEventListener("click", () => profilePicInput.click());

profilePicInput.addEventListener("change", function () {
  if (this.files[0]) {
    fileNameSpan.textContent = this.files[0].name;

    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.innerHTML = `<img src="${e.target.result}" width="120" style="border-radius:8px; border: 2px solid #666;">`;
    };
    reader.readAsDataURL(this.files[0]);
  }
});

// Reset Button
document.getElementById("resetBtn").addEventListener("click", () => {
  form.reset();
  fileNameSpan.textContent = "No file selected";
  imagePreview.innerHTML = "";
  clearAllErrors();
});

function clearAllErrors() {
  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
}

// Email validation helper
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Main Validation & Submit
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop page refresh
  clearAllErrors();

  let isValid = true;

  // First Name
  const firstName = document.getElementById("firstName").value.trim();
  if (firstName === "") {
    document.getElementById("firstNameError").textContent =
      "First name is required";
    isValid = false;
  }

  // Last Name
  const lastName = document.getElementById("lastName").value.trim();
  if (lastName === "") {
    document.getElementById("lastNameError").textContent =
      "Last name is required";
    isValid = false;
  }

  // Age
  const age = document.getElementById("age").value;
  if (age === "" || age < 1 || age > 120) {
    document.getElementById("ageError").textContent =
      "Please enter a valid age (1-120)";
    isValid = false;
  }

  // Email
  const email = document.getElementById("email").value.trim();
  if (email === "" || !isValidEmail(email)) {
    document.getElementById("emailError").textContent =
      "Please enter a valid email";
    isValid = false;
  }

  // Password
  const password = document.getElementById("password").value;
  if (password.length < 6) {
    document.getElementById("passwordError").textContent =
      "Password must be at least 6 characters";
    isValid = false;
  }

  // Terms
  const termsChecked = document.getElementById("terms").checked;
  if (!termsChecked) {
    document.getElementById("termsError").textContent =
      "You must agree to the terms";
    isValid = false;
  }

  if (!isValid) {
    return; // Stop if any error
  }

  // === SAVE TO LOCAL STORAGE ===
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const newUser = {
    id: Date.now(),
    firstName: firstName,
    lastName: lastName,
    age: parseInt(age),
    gender: document.getElementById("gender").value,
    email: email,
    role: document.querySelector('input[name="role"]:checked').value,
    registeredDate: new Date().toLocaleDateString(),
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // Show Success Popup
  popupMessage.textContent = `Welcome ${firstName}! You are now registered as ${newUser.role}.`;
  successPopup.style.display = "block";

  // Optional: Reset form after success
  // form.reset();
});

// Close popup function
window.closePopup = function () {
  successPopup.style.display = "none";
};
