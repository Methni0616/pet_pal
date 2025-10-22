// 🌗 Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") body.classList.add("dark-mode");

themeToggle.textContent = body.classList.contains("dark-mode") ? "🌙 Dark Mode" : "🌞 Light Mode";

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "🌙 Dark Mode" : "🌞 Light Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// 🧭 Tab Navigation
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const target = btn.getAttribute("data-tab");
    contents.forEach(c => c.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});

// 🐶 Pet Profiles
const petForm = document.getElementById("petForm");
const petList = document.getElementById("petList");
let pets = JSON.parse(localStorage.getItem("pets")) || [];

petForm.addEventListener("submit", e => {
  e.preventDefault();
  const pet = {
    name: petName.value,
    age: petAge.value,
    breed: petBreed.value,
    medicalHistory: medicalHistory.value,
    vaccinationDate: vaccinationDate.value
  };
  pets.push(pet);
  localStorage.setItem("pets", JSON.stringify(pets));
  renderPets();
  petForm.reset();
});

function renderPets() {
  petList.innerHTML = pets.map(p => `
    <li><strong>${p.name}</strong> (${p.breed}, ${p.age} years)
    <br>🩺 ${p.medicalHistory || 'No medical history'}
    <br>💉 Next Vaccination: ${p.vaccinationDate || 'Not set'}</li>
  `).join("");
}
renderPets();

// 🕒 Reminders
const reminderForm = document.getElementById("reminderForm");
const reminderList = document.getElementById("reminderList");
let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

reminderForm.addEventListener("submit", e => {
  e.preventDefault();
  const reminder = { title: reminderTitle.value, date: reminderDate.value };
  reminders.push(reminder);
  localStorage.setItem("reminders", JSON.stringify(reminders));
  renderReminders();
  reminderForm.reset();
});

function renderReminders() {
  reminderList.innerHTML = reminders.map(r => `<li>📅 ${r.title} – ${r.date}</li>`).join("");
}
renderReminders();

// 💊 Health Tracker
const healthForm = document.getElementById("healthForm");
const healthList = document.getElementById("healthList");
let healthRecords = JSON.parse(localStorage.getItem("healthRecords")) || [];

healthForm.addEventListener("submit", e => {
  e.preventDefault();
  const record = {
    pet: healthPet.value,
    weight: weight.value,
    diet: diet.value,
    medication: medication.value,
    symptoms: symptoms.value
  };
  healthRecords.push(record);
  localStorage.setItem("healthRecords", JSON.stringify(healthRecords));
  renderHealth();
  healthForm.reset();
});

function renderHealth() {
  healthList.innerHTML = healthRecords.map(h => `
    <li><strong>${h.pet}</strong> - ${h.weight}kg<br>
    🍖 Diet: ${h.diet}<br>💊 Medication: ${h.medication}<br>📝 ${h.symptoms}</li>
  `).join("");
}
renderHealth();

// 📅 Daily Schedule
const scheduleForm = document.getElementById("scheduleForm");
const scheduleList = document.getElementById("scheduleList");
let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

scheduleForm.addEventListener("submit", e => {
  e.preventDefault();
  const schedule = { activity: activity.value, time: time.value };
  schedules.push(schedule);
  localStorage.setItem("schedules", JSON.stringify(schedules));
  renderSchedule();
  scheduleForm.reset();
});

function renderSchedule() {
  scheduleList.innerHTML = schedules.map(s => `<li>🕒 ${s.activity} – ${s.time}</li>`).join("");
}
renderSchedule();
