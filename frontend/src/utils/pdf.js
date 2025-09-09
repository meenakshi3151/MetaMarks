import jsPDF from 'jspdf';

export function generateResultPDF({ name, rollNo, subjects, percentage, classLabel, hashToSign }) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('University Result', 20, 20);
  doc.setFontSize(12);
  doc.text(`Name: ${name}`, 20, 30);
  doc.text(`Roll No: ${rollNo}`, 20, 37);
  let y = 50;
  doc.text('Subjects:', 20, y);
  y += 7;
  subjects.forEach((s) => {
    doc.text(`- ${s.name}: ${s.marks}`, 25, y);
    y += 7;
  });
  y += 5;
  doc.text(`Percentage: ${percentage.toFixed(2)}%`, 20, y);
  y += 7;
  doc.text(`Class: ${classLabel}`, 20, y);
  y += 12;
  if (hashToSign) {
    doc.text(`Verification Hash: ${hashToSign}`, 20, y);
  }
  return doc;
}


