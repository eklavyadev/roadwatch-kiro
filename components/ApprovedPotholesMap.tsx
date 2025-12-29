'use client';

export default function ApprovedPotholesMap() {
  return (
    <div className="bg-[#0f172a] border border-slate-700 rounded-lg p-8 text-center">
      <div className="space-y-4">
        <div className="w-16 h-16 mx-auto bg-slate-700 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Interactive Map Coming Soon
          </h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            We're building an interactive map to visualize all verified potholes. 
            This will help authorities prioritize repairs based on location and severity.
          </p>
        </div>

        <div className="flex justify-center space-x-4 text-xs text-gray-500">
          <span>📍 GPS Coordinates</span>
          <span>🗺️ Interactive View</span>
          <span>📊 Severity Levels</span>
        </div>
      </div>
    </div>
  );
}