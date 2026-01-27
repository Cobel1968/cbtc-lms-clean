'use client';
import { jsPDF } from 'jspdf';

export const generateCertificate = (studentName: string, courseName: string, score: number) => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  doc.setFillColor(15, 23, 42); 
  doc.rect(0, 0, 297, 210, 'F');
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(2);
  doc.rect(10, 10, 277, 190);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(30);
  doc.text('COBEL BUSINESS TRAINING CENTER', 148, 50, { align: 'center' });
  doc.setFontSize(20);
  doc.text(studentName.toUpperCase(), 148, 110, { align: 'center' });
  doc.setFontSize(14);
  doc.text(`Technical Fluency Score: ${score}%`, 148, 160, { align: 'center' });
  doc.save('Cobel-Certificate.pdf');
};
