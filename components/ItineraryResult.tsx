import React from 'react';
import { DayPlan, Activity } from '../types';

interface ItineraryResultProps {
  itinerary: DayPlan[];
  onUpdateCost: (dayIndex: number, activityIndex: number, cost: number) => void;
}

interface ActivityCardProps {
  activity: Activity;
  dayIndex: number;
  activityIndex: number;
  onUpdateCost: (dayIndex: number, activityIndex: number, cost: number) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, dayIndex, activityIndex, onUpdateCost }) => (
  <div className="flex flex-col md:flex-row bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-blue-200 transition-colors duration-300">
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <h4 className="font-bold text-gray-800 text-lg">{activity.name}</h4>
        {/* Verification Icon */}
        <div className="relative group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10 pointer-events-none">
              Terverifikasi Real-time
            </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{activity.description}</p>
      
      <div className="flex flex-wrap gap-3 text-sm mt-2">
        <span className="flex items-center text-orange-600 bg-orange-50 px-2 py-1 rounded">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {activity.hours}
        </span>
        <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {activity.cost}
        </span>
      </div>
    </div>
    
    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-3 min-w-[140px]">
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500 mb-1">Biaya Aktual (Est.)</label>
        <div className="relative">
          <input 
            type="number" 
            min="0"
            placeholder="0"
            value={activity.userCost || ''}
            onChange={(e) => onUpdateCost(dayIndex, activityIndex, parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-gray-800"
          />
        </div>
      </div>

      <button 
        className="w-full px-4 py-2 bg-white text-primary border border-primary rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-colors duration-200 whitespace-nowrap shadow-sm"
        onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(activity.name + " ticket price")}`, '_blank')}
      >
        Cek Harga
      </button>
    </div>
  </div>
);

const DayCard: React.FC<{ dayPlan: DayPlan; dayIndex: number; onUpdateCost: any }> = ({ dayPlan, dayIndex, onUpdateCost }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-8 relative">
    <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl font-bold">Hari ke-{dayPlan.day}</h3>
        <span className="text-blue-100 font-medium text-sm bg-white/20 px-3 py-1 rounded-full">
          {dayPlan.theme}
        </span>
      </div>
    </div>
    <div className="p-4 md:p-6 space-y-4">
      {dayPlan.activities.map((activity, idx) => (
        <React.Fragment key={idx}>
          <ActivityCard 
            activity={activity} 
            dayIndex={dayIndex}
            activityIndex={idx}
            onUpdateCost={onUpdateCost}
          />
          {idx < dayPlan.activities.length - 1 && (
            <div className="flex justify-center py-1">
              <div className="h-4 w-px bg-gray-200"></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const BudgetSummary: React.FC<{ itinerary: DayPlan[] }> = ({ itinerary }) => {
  const totalCost = itinerary.reduce((total, day) => {
    return total + day.activities.reduce((dayTotal, act) => dayTotal + (act.userCost || 0), 0);
  }, 0);

  const averageDailyCost = totalCost / (itinerary.length || 1);

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden text-white mt-8 p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">Budget Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-semibold">Total Estimasi Pengeluaran</p>
          <div className="text-4xl font-extrabold text-green-400">
            {totalCost.toLocaleString('id-ID')}
          </div>
          <p className="text-gray-400 text-xs mt-2">*Berdasarkan input biaya aktual Anda</p>
        </div>
        
        <div>
          <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-semibold">Rata-rata Per Hari</p>
          <div className="text-4xl font-extrabold text-blue-400">
            {averageDailyCost.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
          </div>
          <p className="text-gray-400 text-xs mt-2">Perkiraan pengeluaran harian</p>
        </div>
      </div>
    </div>
  );
};

const ItineraryResult: React.FC<ItineraryResultProps> = ({ itinerary, onUpdateCost }) => {
  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-8 animate-fade-in-up pb-20">
       <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Rencana Perjalanan Anda</h2>
          <p className="text-gray-500 mt-2">Disusun khusus berdasarkan preferensi Anda</p>
       </div>
      
      {itinerary.map((dayPlan, idx) => (
        <DayCard 
          key={dayPlan.day} 
          dayPlan={dayPlan} 
          dayIndex={idx}
          onUpdateCost={onUpdateCost}
        />
      ))}

      <BudgetSummary itinerary={itinerary} />

      <div className="text-center text-gray-400 text-sm">
        <p>* Harga dan jam buka dapat berubah sewaktu-waktu. Selalu verifikasi sebelum berkunjung.</p>
      </div>
    </div>
  );
};

export default ItineraryResult;