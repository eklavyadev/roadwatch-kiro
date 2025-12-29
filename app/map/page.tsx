import Navbar from "../../components/navbar";
import ApprovedPotholesMap from "../../components/ApprovedPotholesMap";

export default function MapPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#020817] text-white px-6 py-20 mt-10">
        <div className="mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Road<span className="text-cyan-400">Watch</span> Map
            </h1>
            <p className="mt-4 text-gray-400">
              Interactive map showing all verified pothole reports with precise GPS locations.
              Click on markers to view details about each report.
            </p>
          </div>

          {/* Map Container */}
          <div className="bg-[#0f172a] border border-slate-700 rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white mb-2">
                Verified Pothole Locations
              </h2>
              <p className="text-sm text-gray-400">
                Only approved reports are displayed on this map. Each marker represents a verified pothole report with photo evidence.
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden">
              <ApprovedPotholesMap />
            </div>
          </div>

          {/* Map Legend */}
          <div className="mt-8 bg-[#0f172a] border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Map Legend</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">High Severity (4-5)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300">Medium Severity (3)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Low Severity (1-2)</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Severity levels are determined by citizen reports and verified through our validation system.
            </p>
          </div>

          {/* Usage Instructions */}
          <div className="mt-8 bg-[#0f172a] border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">How to Use This Map</h3>
            <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
              <li>Click on any marker to view detailed information about the pothole</li>
              <li>Use zoom controls to explore specific areas in detail</li>
              <li>The map automatically adjusts to show all verified reports</li>
              <li>Each marker represents a location with photo evidence and GPS verification</li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}