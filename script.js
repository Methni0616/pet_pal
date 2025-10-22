const petForm = document.getElementById("petForm");
const petList = document.getElementById("petList");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

// Load saved pets from localStorage
let pets = JSON.parse(localStorage.getItem("pets")) || [];

// Render pets
function renderPets(filter = "") {
  petList.innerHTML = "";
  pets
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((pet, index) => {
      const div = document.createElement("div");
      div.className = "pet-card";
      div.innerHTML = `
        <h3>${pet.name}</h3>
        <small>${pet.type} • ${pet.age} years old</small><br>
        🩺 Next Vaccination: ${pet.vaccination}
        <div class="actions">
          <button class="edit" onclick="editPet(${index})">✏️ Edit</button>
          <button class="delete" onclick="deletePet(${index})">🗑️ Delete</button>
        </div>
      `;
      petList.appendChild(div);
    });
}

// Add new pet
petForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newPet = {
    name: petForm.petName.value,
    type: petForm.petType.value,
    age: petForm.petAge.value,
    vaccination: petForm.petVaccination.value,
  };
  pets.push(newPet);
  savePets();
  renderPets();
  petForm.reset();
});

// Delete pet
function deletePet(index) {
  if (confirm("Delete this pet?")) {
    pets.splice(index, 1);
    savePets();
    renderPets();
  }
}

// Edit pet
function editPet(index) {
  const pet = pets[index];
  petForm.petName.value = pet.name;
  petForm.petType.value = pet.type;
  petForm.petAge.value = pet.age;
  petForm.petVaccination.value = pet.vaccination;
  pets.splice(index, 1);
  savePets();
  renderPets();
}

// Save to localStorage
function savePets() {
  localStorage.setItem("pets", JSON.stringify(pets));
}

// Search
searchInput.addEventListener("input", (e) => {
  renderPets(e.target.value);
});

// Dark mode toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = 
    document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Initial render
renderPets();
