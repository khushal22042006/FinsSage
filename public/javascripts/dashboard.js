


  // Dark Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check localStorage for theme on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="bi bi-brightness-high"></i>'; // optional: change icon
  } else {
    themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Change toggle icon
    themeToggle.innerHTML = isDark 
      ? '<i class="bi bi-brightness-high"></i>'
      : '<i class="bi bi-moon"></i>';
  });

  // Profile Dropdown
  const profileIcon = document.getElementById('profile-icon');
  const profileDropdown = document.getElementById('profile-dropdown');

  profileIcon.addEventListener('click', () => {
    profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
  });

  window.addEventListener('click', function (e) {
    if (!profileDropdown.contains(e.target) && e.target !== profileIcon) {
      profileDropdown.style.display = 'none';
    }
  });

  const monthInput = document.getElementById("monthInput");
  const form = document.getElementById("monthForm");

  monthInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // optional: avoid native form quirks
      form.submit();
    }
  });

  // Modal open/close
const openAddModal = document.getElementById("openAddModal");
const addModal = document.getElementById("addModal");
const closeAddModal = document.getElementById("closeAddModal");

openAddModal.addEventListener("click", (e) => {
  e.preventDefault();
  addModal.classList.remove("d-none");
});

closeAddModal.addEventListener("click", () => {
  addModal.classList.add("d-none");
});

window.addEventListener("click", (e) => {
  if (e.target === addModal) {
    addModal.classList.add("d-none");
  }
});



// Flash message on AI Bot click
const aiBotBtn = document.getElementById("aiBotBtn");
const flashMessageJs = document.getElementById("flashMessageJs");
const flashMessageText = document.getElementById("flashMessageText");

aiBotBtn.addEventListener("click", (e) => {
  e.preventDefault();
  flashMessageText.textContent = "Coming soon...";
  flashMessageJs.style.display = "block";

  setTimeout(() => {
    flashMessageJs.style.display = "none";
  }, 3000); // hide after 3 seconds
});



