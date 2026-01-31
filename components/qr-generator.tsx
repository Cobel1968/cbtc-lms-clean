"use client";
import { QRCodeSVG } from 'qrcode.react';

export default function StudentQR({ studentId }: { studentId: string }) {
  const downloadQR = () => {
    const svg = document.getElementById(`qr-${studentId}`);
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `QR-${studentId}.png`;
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <QRCodeSVG 
        id={`qr-${studentId}`}
        value={`https://cbtc-lms.vercel.app/student/${studentId}`}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#003366"}
        level={"H"}
        includeMargin={true}
      />
      <button 
        onClick={downloadQR}
        className="text-[9px] font-black uppercase tracking-widest text-blue-400 hover:text-emerald-400 transition-colors"
      >
        Download Badge QR
      </button>
    </div>
  );
}