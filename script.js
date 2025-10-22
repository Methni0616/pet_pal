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

  // Clear form
  document.getElementById("petForm").reset();
});
