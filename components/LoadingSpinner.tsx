import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
      </div>
      <p className="text-gray-600 font-medium animate-pulse">Sedang menyusun rencana perjalanan Anda...</p>
      <p className="text-sm text-gray-400">Mencari harga dan jam buka terbaru...</p>
    </div>
  );
};

export default LoadingSpinner;
