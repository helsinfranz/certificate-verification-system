import { jsPDF } from "jspdf";

export const generateCertificate = (
  name,
  internshipDomain,
  startDate,
  endDate
) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
  });

  // Background color
  doc.setFillColor(240, 240, 240); // Light gray background
  doc.rect(
    0,
    0,
    doc.internal.pageSize.width,
    doc.internal.pageSize.height,
    "F"
  );

  // Title
  doc.setFontSize(30);
  doc.setTextColor(34, 150, 243); // Blue color
  doc.text("Certificate of Internship", 148, 40, null, null, "center");

  // Award Message
  doc.setFontSize(20);
  doc.setTextColor(0, 51, 102); // Darker blue
  doc.text("This certificate is awarded to", 148, 70, null, null, "center");

  // Name
  doc.setFontSize(24);
  doc.setFont("Courier", "bold");
  doc.text(name, 148, 90, null, null, "center");

  // Description
  doc.setFontSize(16);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(0, 102, 204); // Medium blue
  doc.text(`For completing an internship in`, 148, 110, null, null, "center");
  doc.setFontSize(24);
  doc.setFont("Courier", "bold");
  doc.text(internshipDomain, 148, 130, null, null, "center");
  doc.setFontSize(16);
  doc.setFont("Helvetica", "normal");
  doc.text(`From: ${startDate}`, 58, 150, null, null, "left");
  doc.text(`To: ${endDate}`, 255, 150, null, null, "right");

  // Footer
  doc.setFontSize(12);
  doc.setTextColor(100); // Gray color
  doc.text(
    "Issued on: " + new Date().toLocaleDateString(),
    255,
    180,
    null,
    null,
    "right"
  );

  // Save the document
  doc.save(`${name}_Certificate.pdf`);
};
