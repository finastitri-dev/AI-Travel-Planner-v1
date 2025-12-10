import React, { useState } from 'react';
import { TravelFormData } from '../types';

interface InputFormProps {
  onSubmit: (data: TravelFormData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState<number | ''>('');
  const [interests, setInterests] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination && duration && interests) {
      onSubmit({ destination, duration: Number(duration), interests });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-xl mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Mulai Petualangan
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-1">
            Tujuan Wisata
          </label>
          <input
            id="destination"
            type="text"
            placeholder="Contoh: Kyoto, Jepang"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 outline-none"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-1">
            Durasi (Hari)
          </label>
          <input
            id="duration"
            type="number"
            min="1"
            max="30"
            placeholder="Contoh: 5"
            value={duration}
            onChange={(e) => setDuration(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 outline-none"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="interests" className="block text-sm font-semibold text-gray-700 mb-1">
            Minat Khusus
          </label>
          <textarea
            id="interests"
            rows={3}
            placeholder="Contoh: Kuliner, Sejarah, Fotografi, Alam"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 outline-none resize-none"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3.5 px-6 rounded-lg text-white font-bold text-lg shadow-lg transform transition-all duration-200 
            ${isLoading 
              ? 'bg-gray-400 cursor-not-allowed opacity-70' 
              : 'bg-gradient-to-r from-primary to-secondary hover:shadow-xl hover:-translate-y-1 active:translate-y-0'
            }`}
        >
          {isLoading ? 'Sedang Memproses...' : 'Buat Rencana Perjalanan ✈️'}
        </button>
      </form>
    </div>
  );
};

export default InputForm;