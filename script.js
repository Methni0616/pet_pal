// Handle form submission
document.getElementById("petForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("petName").value;
  const type = document.getElementById("petType").value;
  const age = document.getElementById("petAge").value;
  const vaccination = document.getElementById("petVaccination").value;

  const petList = document.getElementById("petList");

  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${name}</strong> (${type}, ${age} years old) <br>
    🩺 Next Vaccination: ${vaccination}
  `;

  petList.appendChild(li);

  document.getElementById("petForm").reset();
});

// 🌗 Theme Toggle Feature
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "🌙 Dark Mode";
} else {
  themeToggle.textContent = "🌞 Light Mode";
}

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    themeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌞 Light Mode";
    localStorage.setItem("theme", "light");
  }
});
