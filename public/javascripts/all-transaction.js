    // Apply dark mode if saved

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



    // Toggle Details
    document.querySelectorAll(".toggle-details").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-index");
        const detailsEl = document.getElementById(`details-${idx}`);
        detailsEl.classList.toggle("hidden");
        btn.innerText = detailsEl.classList.contains("hidden") ? "More..." : "Less";
      });
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



    // Show Delete Confirmation
    function confirmDelete(id) {
  const modal = document.getElementById("deleteModal");
  const form = document.getElementById("deleteForm");

  // Dynamically build correct action
  const userId = "<%= user.userId %>";
  form.action = `/${userId}/transaction/${id}?_method=DELETE`;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

    // Close modal on outside click
    window.addEventListener("click", function (e) {
      const modal = document.getElementById("deleteModal");
      if (e.target === modal) {
        modal.classList.add("hidden");
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


  
