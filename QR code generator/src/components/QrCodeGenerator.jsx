// src/QrCodeGenerator.js

import React, { useState } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';

const QrCodeGenerator = () => {
  const [inputValue, setInputValue] = useState('');
  const [isSVG, setIsSVG] = useState(true);
  const defaultValue = "https://example.com"; // Dummy QR code value

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleToggle = () => {
    setIsSVG(!isSVG);
    setInputValue(''); // Clear input when switching formats
  };

  const handleDownload = () => {
    if (isSVG) {
      // Download SVG
      const svg = document.querySelector('svg');
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(svg);
      const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Download PNG
      const canvas = document.querySelector('canvas');
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = () => {
    const emailBody = `Check out this QR code: ${inputValue || defaultValue}`;
    window.open(`mailto:?subject=QR Code&body=${emailBody}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-4">QR Code Generator</h1>
      <div className="mb-4">
        <label className="mr-2">
          <input
            type="radio"
            checked={isSVG}
            onChange={handleToggle}
          /> SVG
        </label>
        <label>
          <input
            type="radio"
            checked={!isSVG}
            onChange={handleToggle}
          /> Canvas
        </label>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter URL or Text"
        className="p-2 bg-gray-800 border border-gray-700 rounded mb-4"
      />
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
        {isSVG ? (
          <QRCodeSVG value={inputValue || defaultValue} size={256} />
        ) : (
          <QRCodeCanvas value={inputValue || defaultValue} size={256} />
        )}
      </div>
      <div className="flex mt-4">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Download QR Code
        </button>
        <button
          onClick={handleShare}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Share QR Code
        </button>
      </div>
      <button
        onClick={() => setInputValue('')}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Clear
      </button>
    </div>
  );
};

export default QrCodeGenerator;
