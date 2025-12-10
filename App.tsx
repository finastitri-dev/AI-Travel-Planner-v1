import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ItineraryResult from './components/ItineraryResult';
import LoadingSpinner from './components/LoadingSpinner';
import { generateTravelItinerary } from './services/geminiService';
import { DayPlan, TravelFormData } from './types';

const App: React.FC = () => {
  const [itinerary, setItinerary] = useState<DayPlan[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: TravelFormData) => {
    setLoading(true);
    setError(null);
    setItinerary(null);
    
    try {
      const result = await generateTravelItinerary(
        data.destination,
        data.duration,
        data.interests
      );
      setItinerary(result);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat membuat rencana perjalanan.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCost = (dayIndex: number, activityIndex: number, cost: number) => {
    if (!itinerary) return;

    const newItinerary = [...itinerary];
    const day = { ...newItinerary[dayIndex] };
    const activities = [...day.activities];
    
    activities[activityIndex] = {
      ...activities[activityIndex],
      userCost: cost
    };

    day.activities = activities;
    newItinerary[dayIndex] = day;
    setItinerary(newItinerary);
  };

  const handleReset = () => {
    setItinerary(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 selection:bg-primary selection:text-white">
      {/* Header / Hero */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 bg-opacity-90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={handleReset} role="button">
            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
              AI
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
              Travel Planner
            </h1>
          </div>
          {itinerary && (
             <button 
               onClick={handleReset}
               className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
             >
               Buat Baru
             </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {!itinerary && !loading && (
           <div className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Rencanakan Liburan Impian <br/>
                <span className="text-primary">Dalam Sekejap</span>
              </h2>
              <p className="text-lg text-gray-600">
                Masukkan tujuan, durasi, dan minat Anda. Biarkan AI kami menyusun itinerary harian yang lengkap dengan estimasi biaya dan jam operasional terbaru.
              </p>
           </div>
        )}

        <div className="transition-all duration-500 ease-in-out">
          {!itinerary && !loading && (
             <InputForm onSubmit={handleFormSubmit} isLoading={loading} />
          )}

          {loading && (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <div className="max-w-xl mx-auto mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
              <button 
                onClick={() => setError(null)}
                className="mt-3 text-sm font-semibold text-red-700 hover:text-red-900"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {itinerary && (
            <ItineraryResult 
              itinerary={itinerary} 
              onUpdateCost={handleUpdateCost}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AI Travel Planner. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;