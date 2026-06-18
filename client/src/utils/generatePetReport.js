import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePetReport = (data) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Pet Pal Health Report", 14, 20);

  doc.setFontSize(12);

  doc.text(`Pet Name: ${data.pet.name}`, 14, 35);
  doc.text(`Species: ${data.pet.species}`, 14, 45);
  doc.text(`Breed: ${data.pet.breed}`, 14, 55);
  doc.text(`Age: ${data.pet.age}`, 14, 65);

  doc.text(
    `Health Score: ${data.healthScore}%`,
    14,
    80
  );

  autoTable(doc, {
    startY: 95,

    head: [["Category", "Count"]],

    body: [
      [
        "Vaccinations",
        data.stats.vaccinations,
      ],

      [
        "Weight Records",
        data.stats.weights,
      ],

      [
        "Medications",
        data.stats.medications,
      ],

      [
        "Vet Visits",
        data.stats.vetVisits,
      ],

      [
        "Feedings",
        data.stats.feedings,
      ],

      [
        "Health Records",
        data.stats.healthRecords,
      ],
    ],
  });

  doc.text(
    `Generated: ${new Date().toLocaleDateString()}`,
    14,
    doc.lastAutoTable.finalY + 20
  );

  doc.save(
    `${data.pet.name}_Health_Report.pdf`
  );
};